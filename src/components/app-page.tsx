'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function AppPage() {
  const watchedMovies = [
    { id: 1, title: "Inception", rating: 4.5, image: "/placeholder.svg?height=200&width=150" },
    { id: 2, title: "The Shawshank Redemption", rating: 4.8, image: "/placeholder.svg?height=200&width=150" },
    { id: 3, title: "Pulp Fiction", rating: 4.3, image: "/placeholder.svg?height=200&width=150" },
    { id: 4, title: "The Godfather", rating: 4.7, image: "/placeholder.svg?height=200&width=150" },
    { id: 5, title: "The Dark Knight", rating: 4.6, image: "/placeholder.svg?height=200&width=150" },
    { id: 6, title: "Forrest Gump", rating: 4.4, image: "/placeholder.svg?height=200&width=150" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/placeholder.svg?height=50&width=50" alt="Film Club Logo" width={50} height={50} className="mr-4" />
            <h1 className="text-2xl font-bold">Film Club</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/upcoming" className="hover:text-gray-300">Upcoming Movies</Link></li>
              <li><Link href="/suggest" className="hover:text-gray-300">Suggest a Movie</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Welcome to Film Club</h2>
          <p className="text-lg">
            Join us every week for exciting movie screenings and discussions. We explore a wide range of genres and eras, from classic masterpieces to contemporary gems. Share your passion for cinema with like-minded individuals and discover new favorites!
          </p>
          <Button className="mt-4">Join Now</Button>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Movies We&apos;ve Watched</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchedMovies.map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
                  <CardContent className="p-4">
                    <Image src={movie.image} alt={movie.title} width={150} height={200} className="w-full h-auto mb-2" />
                    <h3 className="font-semibold mb-1">{movie.title}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Film Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}