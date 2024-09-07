'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function AppMoviesIdPage({ params }: { params: { id: string } }) {
  const [comments, setComments] = useState<Array<{ name: string; comment: string }>>([])
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  // Mock movie data (in a real app, you'd fetch this based on the ID)
  const movie = {
    id: params.id,
    title: "Inception",
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=200",
    watchDate: "2023-05-15",
    description: "A thief who enters the dreams of others to steal secrets from their subconscious.",
    director: "Christopher Nolan",
    year: "2010",
    genre: "Sci-Fi, Action, Thriller"
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && comment) {
      setComments([...comments, { name, comment }])
      setName('')
      setComment('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-2xl font-bold">Film Club</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
                <Image 
                  src={movie.image} 
                  alt={movie.title} 
                  width={200} 
                  height={300} 
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
                <p className="text-gray-400">Watched by Film Club on: {movie.watchDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 mb-8">
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
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

      <footer className="bg-gray-800 py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Film Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}