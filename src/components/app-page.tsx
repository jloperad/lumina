'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Page() {
  const watchedMovies = [
    { id: 1, title: "Inception", rating: 4.5, image: "/placeholder.svg?height=300&width=200" },
    { id: 2, title: "The Shawshank Redemption", rating: 4.8, image: "/placeholder.svg?height=300&width=200" },
    { id: 3, title: "Pulp Fiction", rating: 4.3, image: "/placeholder.svg?height=300&width=200" },
    { id: 4, title: "The Godfather", rating: 4.7, image: "/placeholder.svg?height=300&width=200" },
    { id: 5, title: "The Dark Knight", rating: 4.6, image: "/placeholder.svg?height=300&width=200" },
    { id: 6, title: "Forrest Gump", rating: 4.4, image: "/placeholder.svg?height=300&width=200" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg?height=40&width=40" alt="Film Club Logo" width={40} height={40} />
            <span className="text-xl font-semibold">Film Club</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/upcoming" className="hover:text-gray-300 transition-colors">Upcoming</Link></li>
              <li><Link href="/suggest" className="hover:text-gray-300 transition-colors">Suggest</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Film Club</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Join us weekly to explore cinematic masterpieces, from timeless classics to contemporary gems.
          </p>
          <Button size="lg">Join Now</Button>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-8 text-center">Recently Watched</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {watchedMovies.map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id} className="group">
                <Card className="bg-gray-800 border-0 overflow-hidden transition-transform transform hover:scale-105">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image src={movie.image} alt={movie.title} width={200} height={300} className="w-full h-auto" />
                      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="font-semibold mb-1">{movie.title}</h3>
                          <div className="flex items-center justify-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span>{movie.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 Film Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}