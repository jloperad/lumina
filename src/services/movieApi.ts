import axios from 'axios';

const API_KEY = 'f34d36acca2a8a079bdbb70ec3389d06';
const BASE_URL = 'https://api.themoviedb.org/3';

const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async () => {
  const response = await movieApi.get('/movie/popular');
  return response.data.results;
};

export const getMovieDetails = async (id: string) => {
  const response = await movieApi.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits'
    }
  });
  return response.data;
};

export type WatchedMovie = {
  id: number;  // This will be the TMDb ID
  title: string;
  rating: number;
  imageUrl: string;
  watchDate: string;
}

const watchedMovies: WatchedMovie[] = [
  { id: 27205, title: "Inception", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", watchDate: "2023-05-15" },
  { id: 278, title: "The Shawshank Redemption", rating: 4.8, imageUrl: "https://image.tmdb.org/t/p/w200/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", watchDate: "2023-06-01" },
  { id: 680, title: "Pulp Fiction", rating: 4.3, imageUrl: "https://image.tmdb.org/t/p/w200/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", watchDate: "2023-06-15" },
  { id: 238, title: "The Godfather", rating: 4.7, imageUrl: "https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", watchDate: "2023-07-01" },
  { id: 155, title: "The Dark Knight", rating: 4.6, imageUrl: "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg", watchDate: "2023-07-15" },
  { id: 13, title: "Forrest Gump", rating: 4.4, imageUrl: "https://image.tmdb.org/t/p/w200/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", watchDate: "2023-08-01" },
];

export function fetchWatchedMovies(): WatchedMovie[] {
  return watchedMovies;
}

export default movieApi;