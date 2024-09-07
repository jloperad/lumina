'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AppUpcomingPage() {
  const plannedMovies = [
    { id: 1, title: "The French Dispatch", date: "2023-06-15", image: "/placeholder.svg?height=200&width=150" },
    { id: 2, title: "Dune", date: "2023-06-22", image: "/placeholder.svg?height=200&width=150" },
    { id: 3, title: "No Time to Die", date: "2023-06-29", image: "/placeholder.svg?height=200&width=150" },
  ]

  const suggestedMovies = [
    { id: 4, title: "The Power of the Dog", image: "/placeholder.svg?height=200&width=150" },
    { id: 5, title: "Spencer", image: "/placeholder.svg?height=200&width=150" },
    { id: 6, title: "Last Night in Soho", image: "/placeholder.svg?height=200&width=150" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-2xl font-bold">Film Club</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Upcoming Movies</h1>

        <Tabs defaultValue="planned" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="planned">Planned Movies</TabsTrigger>
            <TabsTrigger value="suggested">Suggested Movies</TabsTrigger>
          </TabsList>
          <TabsContent value="planned">
            <Card className="bg-gray-800">
              <CardHeader>
                <CardTitle>Planned Movies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plannedMovies.map((movie) => (
                    <div key={movie.id} className="flex items-center space-x-4">
                      <Image src={movie.image} alt={movie.title} width={75} height={100} className="rounded-lg" />
                      <div>
                        <h3 className="font-semibold">{movie.title}</h3>
                        <p className="text-sm text-gray-400">{movie.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="suggested">
            <Card className="bg-gray-800">
              <CardHeader>
                <CardTitle>Suggested Movies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedMovies.map((movie) => (
                    <div key={movie.id} className="flex items-center space-x-4">
                      <Image src={movie.image} alt={movie.title} width={75} height={100} className="rounded-lg" />
                      <div>
                        <h3 className="font-semibold">{movie.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-800 py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Film Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}