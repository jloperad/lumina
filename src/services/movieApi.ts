import axios from 'axios';
import { supabase } from '@/lib/supabaseClient';

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
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .order('watch_date', { ascending: false });

  if (error) {
    console.error('Error fetching watched movies:', error);
    throw new Error('Failed to fetch watched movies');
  }

  if (!data) {
    return [];
  }

  const watchedMovies: WatchedMovie[] = data.map((movie) => ({
    id: movie.id,
    tmdbId: movie.tmdb_id,
    title: movie.title,
    rating: movie.rating,
    imageUrl: movie.image_url,
    watchDate: movie.watch_date,
    description: movie.description,
    director: movie.director,
    year: movie.year,
    genre: movie.genre,
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

export default movieApi;