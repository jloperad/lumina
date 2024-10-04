'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ThumbsUp, Star } from 'lucide-react'

const upcomingMovies = [
  { 
    id: 1, 
    title: "Dune: Part Two", 
    date: "2024-03-01", 
    image: "/placeholder.svg?height=450&width=300",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    introduction: "As a continuation of the epic sci-fi saga, we're excited to see how the story unfolds in this highly anticipated sequel."
  },
  { 
    id: 2, 
    title: "Godzilla x Kong: The New Empire", 
    date: "2024-04-12", 
    image: "/placeholder.svg?height=450&width=300",
    description: "Two titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.",
    introduction: null
  },
  { 
    id: 3, 
    title: "Furiosa: A Mad Max Saga", 
    date: "2024-05-24", 
    image: "/placeholder.svg?height=450&width=300",
    description: "The origin story of the powerful warrior Furiosa before she teamed up with Mad Max in Fury Road.",
    introduction: "We're watching this prequel to dive deeper into the post-apocalyptic world and understand Furiosa's backstory."
  },
]

const initialSuggestedMovies = [
  { id: 1, title: "The French Dispatch", year: "2021", score: 7.2, upvotes: 15, image: "/placeholder.svg?height=300&width=200" },
  { id: 2, title: "Dune", year: "2021", score: 8.0, upvotes: 28, image: "/placeholder.svg?height=300&width=200" },
  { id: 3, title: "No Time to Die", year: "2021", score: 7.3, upvotes: 22, image: "/placeholder.svg?height=300&width=200" },
  { id: 4, title: "The Power of the Dog", year: "2021", score: 6.9, upvotes: 10, image: "/placeholder.svg?height=300&width=200" },
  { id: 5, title: "Spencer", year: "2021", score: 6.6, upvotes: 8, image: "/placeholder.svg?height=300&width=200" },
  { id: 6, title: "Last Night in Soho", year: "2021", score: 7.1, upvotes: 18, image: "/placeholder.svg?height=300&width=200" },
]

export default function UpcomingMovies() {
  const [currentUpcoming, setCurrentUpcoming] = useState(0)
  const [suggestedMovies, setSuggestedMovies] = useState(initialSuggestedMovies)
  const [votedMovies, setVotedMovies] = useState<number[]>([])

  useEffect(() => {
    const storedVotes = localStorage.getItem('votedMovies')
    if (storedVotes) {
      setVotedMovies(JSON.parse(storedVotes))
    }
  }, [])

  const handlePrevious = () => {
    setCurrentUpcoming((prev) => (prev - 1 + upcomingMovies.length) % upcomingMovies.length)
  }

  const handleNext = () => {
    setCurrentUpcoming((prev) => (prev + 1) % upcomingMovies.length)
  }

  const handleVote = (id: number) => {
    setSuggestedMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === id ? { ...movie, upvotes: votedMovies.includes(id) ? movie.upvotes - 1 : movie.upvotes + 1 } : movie
      ).sort((a, b) => b.upvotes - a.upvotes)
    )

    setVotedMovies(prevVoted => {
      const newVoted = votedMovies.includes(id)
        ? prevVoted.filter(movieId => movieId !== id)
        : [...prevVoted, id]
      localStorage.setItem('votedMovies', JSON.stringify(newVoted))
      return newVoted
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Next Upcoming Movie</h2>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center justify-center space-x-8">
              <Button onClick={handlePrevious} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div className="relative w-[300px] h-[450px]">
                <Image
                  src={upcomingMovies[currentUpcoming].image}
                  alt={upcomingMovies[currentUpcoming].title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                />
                {upcomingMovies[currentUpcoming].introduction && (
                  <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-t-lg">
                    <p className="text-sm italic">{upcomingMovies[currentUpcoming].introduction}</p>
                  </div>
                )}
              </div>
              <Button onClick={handleNext} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="text-center max-w-md">
              <h3 className="text-2xl font-semibold mb-2">{upcomingMovies[currentUpcoming].title}</h3>
              <p className="text-gray-400 mb-4">{upcomingMovies[currentUpcoming].date}</p>
              <p className="text-sm">{upcomingMovies[currentUpcoming].description}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Suggested Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {suggestedMovies.map((movie) => (
              <Card key={movie.id} className="bg-gray-800 border-0 overflow-hidden group relative">
                <CardContent className="p-0">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-lg font-semibold mb-2 text-white hover:text-gray-300 transition-colors">{movie.title}</h3>
                    <p className="text-sm text-white hover:text-gray-300 transition-colors mb-2">{movie.year}</p>
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-white mr-1" />
                      <span className="text-white hover:text-gray-300 transition-colors">{movie.score.toFixed(1)}</span>
                    </div>
                    <button 
                      className={`flex items-center justify-center bg-transparent hover:bg-gray-700 text-white font-semibold py-2 px-4 border ${
                        votedMovies.includes(movie.id) ? 'border-blue-500' : 'border-white'
                      } hover:border-transparent rounded transition-colors duration-300`}
                      onClick={() => handleVote(movie.id)}
                    >
                      <ThumbsUp className={`h-4 w-4 mr-2 ${votedMovies.includes(movie.id) ? 'text-blue-500' : ''}`} />
                      <span>{movie.upvotes}</span>
                    </button>
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