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
  { id: 550, title: "Fight Club", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", watchDate: "2023-08-15" },
  { id: 11, title: "Star Wars", rating: 4.6, imageUrl: "https://image.tmdb.org/t/p/w200/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg", watchDate: "2023-09-01" },
  { id: 597, title: "Titanic", rating: 4.2, imageUrl: "https://image.tmdb.org/t/p/w200/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", watchDate: "2023-09-15" },
  { id: 120, title: "The Lord of the Rings: The Fellowship of the Ring", rating: 4.7, imageUrl: "https://image.tmdb.org/t/p/w200/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", watchDate: "2023-10-01" },
  { id: 122, title: "The Lord of the Rings: The Return of the King", rating: 4.8, imageUrl: "https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", watchDate: "2023-10-15" },
  { id: 157336, title: "Interstellar", rating: 4.6, imageUrl: "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", watchDate: "2023-11-01" },
  { id: 24428, title: "The Avengers", rating: 4.3, imageUrl: "https://image.tmdb.org/t/p/w200/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg", watchDate: "2023-11-15" },
  { id: 129, title: "Spirited Away", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", watchDate: "2023-12-01" },
  { id: 389, title: "12 Angry Men", rating: 4.6, imageUrl: "https://image.tmdb.org/t/p/w200/ppd84D2i9W8jXmsyInGyihiSyqz.jpg", watchDate: "2023-12-15" },
  { id: 497, title: "The Green Mile", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/velWPhVMQeQKcxggNEU8YmIo52R.jpg", watchDate: "2024-01-01" },
  { id: 101, title: "Leon: The Professional", rating: 4.4, imageUrl: "https://image.tmdb.org/t/p/w200/wHqGb8J6tXBVwjqWooGMtNEjs2A.jpg", watchDate: "2024-01-15" },
  { id: 769, title: "GoodFellas", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg", watchDate: "2024-02-01" },
  { id: 637, title: "Life Is Beautiful", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/74hLDKjD5aGYOotO6esUVaeISa2.jpg", watchDate: "2024-02-15" },
  { id: 424, title: "Schindler's List", rating: 4.7, imageUrl: "https://image.tmdb.org/t/p/w200/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", watchDate: "2024-03-01" },
  { id: 240, title: "The Godfather Part II", rating: 4.6, imageUrl: "https://image.tmdb.org/t/p/w200/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg", watchDate: "2024-03-15" },
  { id: 372058, title: "Your Name", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/q719jXXEzOoYaps6babgKnONONX.jpg", watchDate: "2024-04-01" },
  { id: 244786, title: "Whiplash", rating: 4.4, imageUrl: "https://image.tmdb.org/t/p/w200/6uSPcdGNA2A6vJmCagXkvnutegs.jpg", watchDate: "2024-04-15" },
  { id: 429, title: "The Good, the Bad and the Ugly", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg", watchDate: "2024-05-01" },
  { id: 539, title: "Psycho", rating: 4.4, imageUrl: "https://image.tmdb.org/t/p/w200/81d8oyEFgj7FlxJqSDXWr8JH8kV.jpg", watchDate: "2024-05-15" },
  { id: 324857, title: "Spider-Man: Into the Spider-Verse", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg", watchDate: "2024-06-01" },
  { id: 299536, title: "Avengers: Infinity War", rating: 4.3, imageUrl: "https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", watchDate: "2024-06-15" },
  { id: 19404, title: "Dilwale Dulhania Le Jayenge", rating: 4.5, imageUrl: "https://image.tmdb.org/t/p/w200/2CAL2433ZeIihfX1Hb2139CX0pW.jpg", watchDate: "2024-07-01" },
  { id: 696374, title: "The Batman", rating: 4.1, imageUrl: "https://image.tmdb.org/t/p/w200/74xTEgt7R36Fpooo50r9T25onhq.jpg", watchDate: "2024-07-15" },
];

export function fetchWatchedMovies(): WatchedMovie[] {
  return watchedMovies;
}

export default movieApi;