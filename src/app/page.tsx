import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { fetchWatchedMovies} from '@/services/movieApi';

// Define a type for the watched movie data


export default async function FilmClubHome() {
  const watchedMovies = await fetchWatchedMovies();

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Lumina Film Club</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Únete a nosotros semanalmente para explorar las obras maestras del cine, desde clásicos eternos hasta gemas contemporáneas.
        </p>
        <Button size="lg">Únete ahora</Button>
      </section>

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
    </main>
  )
}