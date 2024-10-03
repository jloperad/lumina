'use client';

import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { fetchWatchedMovies, WatchedMovie } from '@/services/movieApi';

const fetcher = () => fetchWatchedMovies();

export function WatchedMoviesSection() {
  const { data: watchedMovies, error } = useSWR<WatchedMovie[]>('watchedMovies', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 0, // Set to 0 to disable polling, or set a value in milliseconds for polling
  });

  if (error) return <div>Failed to load movies</div>;
  if (!watchedMovies) return <div>Loading...</div>;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8 text-center">Vistos recientemente</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {watchedMovies.map((movie) => (
          <Link href={`/movies/${movie.tmdbId}`} key={movie.tmdbId} className="group">
            <Card className="bg-gray-800 border-0 overflow-hidden transition-transform transform hover:scale-105">
            <CardContent className="p-0">
                  <div className="relative">
                    <Image 
                      src={movie.imageUrl} 
                      alt={movie.title} 
                      width={200} 
                      height={300} 
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold mb-1 text-white">{movie.title}</h3>
                        <div className="flex items-center justify-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-white">{movie.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">Vista en: {movie.watchDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
