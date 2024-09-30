'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getMovieDetails, fetchWatchedMovies} from '@/services/movieApi';

type Movie = {
  id: number;
  title: string;
  rating: number;
  imageUrl: string;
  description: string;
  director: string;
  year: string;
  genre: string;
  watchDate?: string;
}

interface CrewMember {
  job: string;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

export default function MovieDetails({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [comments, setComments] = useState<Array<{ name: string; comment: string }>>([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const watchedMovies = fetchWatchedMovies();
        const watchedMovie = watchedMovies.find(m => m.id === parseInt(params.id));
        const tmdbMovie = await getMovieDetails(params.id);

        setMovie({
          id: tmdbMovie.id,
          title: tmdbMovie.title,
          rating: watchedMovie ? watchedMovie.rating : tmdbMovie.vote_average,
          imageUrl: `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`,
          description: tmdbMovie.overview,
          director: tmdbMovie.credits?.crew.find((person: CrewMember) => person.job === "Director")?.name || "Unknown",
          year: new Date(tmdbMovie.release_date).getFullYear().toString(),
          genre: tmdbMovie.genres.map((g: Genre) => g.name).join(', '),
          watchDate: watchedMovie ? watchedMovie.watchDate : undefined
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
        // Handle error (e.g., set an error state, show an error message)
      }
    };

    fetchMovieData();
  }, [params.id]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && comment) {
      setComments([...comments, { name, comment }])
      setName('')
      setComment('')
    }
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="bg-gray-800 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
              <Image 
                src={movie.imageUrl} 
                alt={movie.title} 
                width={300} 
                height={450} 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <p className="mb-2 text-gray-400">Directed by {movie.director} • {movie.year} • {movie.genre}</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              <p className="mb-4">{movie.description}</p>
              {movie.watchDate && (
                <p className="text-gray-400">Watched by Film Club on: {movie.watchDate}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 mb-8">
        <CardContent>
          {comments.map((c, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-700 last:border-b-0">
              <h4 className="font-semibold">{c.name}</h4>
              <p>{c.comment}</p>
            </div>
          ))}
          <form onSubmit={handleSubmitComment} className="mt-6">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2"
            />
            <Textarea
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-2"
            />
            <Button type="submit">Submit Comment</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}