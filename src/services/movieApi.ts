import axios from 'axios';
import { getSupabaseClient } from '@/lib/supabaseClient';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export type WatchedMovie = {
  id: number;
  tmdbId: number;
  title: string;
  rating: number;
  imageUrl: string;
  watchDate: string;
  description?: string;
  director?: string;
  year?: number;
  genre?: string;
};

export async function fetchWatchedMovies(): Promise<WatchedMovie[]> {
  const supabase = await getSupabaseClient();
  
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .not('watch_date', 'is', null)
    .order('watch_date', { ascending: false });

  if (error) {
    console.error('Error fetching watched movies:', error);
    throw new Error('Failed to fetch watched movies');
  }

  if (!data) {
    return [];
  }

  const watchedMovies: WatchedMovie[] = data.map((movie): WatchedMovie => ({
    id: Number(movie.id),
    tmdbId: Number(movie.tmdb_id),
    title: String(movie.title),
    rating: Number(movie.rating),
    imageUrl: String(movie.image_url),
    watchDate: String(movie.watch_date),
    description: String(movie.description),
    director: String(movie.director),
    year: Number(movie.year),
    genre: String(movie.genre),
  }));

  return watchedMovies;
}

export const getMovieDetails = async (id: string) => {
  const response = await movieApi.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits'
    }
  });
  return response.data;
};

export type SearchMovie = {
  id: number;
  tmdbId: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
  overview: string;
  release_date: string;
  genre_ids: number[];
  rating: number;
  imageUrl: string;
  watchDate: string;
  description: string;
  director: string;
  year?: number;
  genre?: string;
};

export async function searchMovies(query: string, year?: string): Promise<SearchMovie[]> {
  try {
    const response = await movieApi.get('/search/movie', {
      params: {
        query,
        include_adult: false,
        year: year || undefined,
      },
    });

    const data = response.data.results;

    if (!data) {
      return [];
    }

    const searchResults: SearchMovie[] = data.map((movie: SearchMovie) => ({
      id: movie.id,
      tmdbId: movie.id,
      title: movie.title,
      rating: movie.vote_average,
      imageUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/placeholder.svg?height=300&width=200',
      watchDate: '',
      description: movie.overview,
      director: '',
      year: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : undefined,
      genre: movie.genre_ids ? movie.genre_ids.join(', ') : undefined,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date,
      genre_ids: movie.genre_ids,
    }));

    return searchResults;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies');
  }
}

export async function saveSuggestion(suggestion: {
  name: string;
  movie: SearchMovie;
  reason: string;
}) {
  try {
    // First, check if the movie already exists in the movies table
    const supabase = await getSupabaseClient();
    const { data: existingMovie, error: fetchError } = await supabase
      .from('movies')
      .select('id')
      .eq('tmdb_id', suggestion.movie.tmdbId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    let movieId: number;

    if (!existingMovie) {
      // If the movie doesn't exist, insert it into the movies table
      const { data: newMovie, error: insertError } = await supabase
        .from('movies')
        .insert({
          tmdb_id: suggestion.movie.tmdbId,
          title: suggestion.movie.title,
          rating: suggestion.movie.rating,
          image_url: suggestion.movie.imageUrl,
          description: suggestion.movie.description,
          year: suggestion.movie.year,
          genre: suggestion.movie.genre,
        })
        .select('id')
        .single()

      if (insertError) throw insertError;
      movieId = newMovie!.id as number;
    } else {
      movieId = existingMovie.id as number;
    }

    // Now insert the suggestion into the suggested_movies table
    const { data, error } = await supabase
      .from('suggested_movies')
      .insert({
        movie_id: movieId,
        suggested_by: suggestion.name,
        reason: suggestion.reason,
      })

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving suggestion:', error);
    throw new Error('Failed to save suggestion');
  }
}

export type SuggestedMovie = {
  id: number;
  movie: WatchedMovie;
  suggested_by: string;
  reason: string;
  votes: number;
};

export async function fetchSuggestedMovies(): Promise<SuggestedMovie[]> {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
      .from('suggested_movies')
      .select(`
        id,
        movie_id,
        suggested_by,
        reason,
        votes,
        movies (
          id,
          tmdb_id,
          title,
          rating,
          image_url,
          description,
          director,
          year,
          genre
        )
      `)
      .order('votes', { ascending: false });

    if (error) throw error;

    const formattedData: SuggestedMovie[] = data.map(item => ({
      id: item.id,
      movie: {
        id: item.movies.id,
        tmdbId: item.movies.tmdb_id,
        title: item.movies.title,
        rating: item.movies.rating,
        imageUrl: item.movies.image_url,
        watchDate: '', // This field is not relevant for suggested movies
        description: item.movies.description,
        director: item.movies.director,
        year: item.movies.year,
        genre: item.movies.genre,
      },
      suggested_by: item.suggested_by,
      reason: item.reason,
      votes: item.votes,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching suggested movies:', error);
    throw new Error('Failed to fetch suggested movies');
  }
}

export async function updateSuggestionVote(id: number, currentVotes: number, increment: boolean): Promise<number> {
  try {
    const supabase = await getSupabaseClient();
    const newVotes = increment ? currentVotes + 1 : currentVotes - 1;

    const { data, error } = await supabase
      .from('suggested_movies')
      .update({ votes: newVotes })
      .eq('id', id)
      .select('votes')
      .single();

    if (error) throw error;

    return data.votes;
  } catch (error) {
    console.error('Error updating vote:', error);
    throw new Error('Failed to update vote');
  }
}

export default movieApi;