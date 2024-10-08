'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ThumbsUp, Star } from 'lucide-react'
import { fetchSuggestedMovies, updateSuggestionVote, SuggestedMovie, fetchPlannedMovies, PlannedMovie } from '@/services/movieApi'

export default function UpcomingMovies() {
  const [currentUpcoming, setCurrentUpcoming] = useState(0)
  const [plannedMovies, setPlannedMovies] = useState<PlannedMovie[]>([])
  const [suggestedMovies, setSuggestedMovies] = useState<SuggestedMovie[]>([])
  const [votedMovies, setVotedMovies] = useState<number[]>([])

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [planned, suggested] = await Promise.all([
          fetchPlannedMovies(),
          fetchSuggestedMovies()
        ]);
        setPlannedMovies(planned);
        setSuggestedMovies(suggested);
      } catch (error) {
        console.error('Error loading movies:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    loadMovies();

    const storedVotes = localStorage.getItem('votedMovies')
    if (storedVotes) {
      setVotedMovies(JSON.parse(storedVotes))
    }
  }, [])

  const handlePrevious = () => {
    setCurrentUpcoming((prev) => (prev === 0 ? plannedMovies.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentUpcoming((prev) => (prev === plannedMovies.length - 1 ? 0 : prev + 1))
  }

  const handleVote = async (id: number) => {
    try {
      const movie = suggestedMovies.find(m => m.id === id);
      if (!movie) return;

      const isVoted = votedMovies.includes(id);
      const newVotes = await updateSuggestionVote(id, movie.votes, !isVoted);

      setSuggestedMovies(prevMovies => 
        prevMovies.map(movie => 
          movie.id === id ? { ...movie, votes: newVotes } : movie
        ).sort((a, b) => b.votes - a.votes)
      );

      const newVotedMovies = isVoted
        ? votedMovies.filter(movieId => movieId !== id)
        : [...votedMovies, id];

      setVotedMovies(newVotedMovies);
      localStorage.setItem('votedMovies', JSON.stringify(newVotedMovies));
    } catch (error) {
      console.error('Error updating vote:', error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Proximas Proyecciones</h2>
          {plannedMovies.length > 0 && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="flex items-center justify-center space-x-8">
                <Button onClick={handlePrevious} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <div className="relative w-[300px] h-[450px]">
                  <Image
                    src={plannedMovies[currentUpcoming].movie.imageUrl || "/placeholder.svg?height=450&width=300"}
                    alt={plannedMovies[currentUpcoming].movie.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                  {plannedMovies[currentUpcoming].reason && 
                    plannedMovies[currentUpcoming].reason.trim() !== '' && 
                    plannedMovies[currentUpcoming].reason.toLowerCase() !== 'null' && (
                      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-t-lg">
                        <p className="text-sm italic">{plannedMovies[currentUpcoming].reason.slice(0, 100)}</p>
                      </div>
                    )}
                </div>
                <Button onClick={handleNext} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-semibold mb-2">{plannedMovies[currentUpcoming].movie.title}</h3>
                <p className="text-gray-400 mb-4">
                  Planeada para: {new Date(plannedMovies[currentUpcoming].planned_date).toLocaleDateString()}
                </p>
                <p className="text-sm">{plannedMovies[currentUpcoming].movie.description}</p>
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Peliculas Sugeridas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {suggestedMovies.map((movie) => (
              <Card key={movie.id} className="bg-gray-800 border-0 overflow-hidden group relative">
                <CardContent className="p-0">
                  <Image
                    src={movie.movie.imageUrl || "/placeholder.svg?height=300&width=200"}
                    alt={movie.movie.title}
                    width={200}
                    height={300}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-lg font-semibold mb-2 text-white hover:text-gray-300 transition-colors">{movie.movie.title}</h3>
                    <p className="text-sm text-white hover:text-gray-300 transition-colors mb-2">{movie.movie.year}</p>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-white mr-1" />
                      <span className="text-white hover:text-gray-300 transition-colors">{movie.movie.rating?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <button 
                      className={`flex items-center justify-center bg-transparent hover:bg-gray-700 text-white font-semibold py-2 px-4 border ${
                        votedMovies.includes(movie.id) ? 'border-blue-500' : 'border-white'
                      } hover:border-transparent rounded transition-colors duration-300`}
                      onClick={() => handleVote(movie.id)}
                    >
                      <ThumbsUp className={`h-4 w-4 mr-2 ${votedMovies.includes(movie.id) ? 'text-blue-500' : ''}`} />
                      <span>{movie.votes}</span>
                    </button>
                    <p className="text-xs text-white hover:text-gray-300 transition-colors mt-5">
                      Sugerido por:<br />
                      {movie.suggested_by}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}