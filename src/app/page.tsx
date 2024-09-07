import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Define a type for the movie data
type Movie = {
  id: number;
  title: string;
  rating: number;
  imageUrl: string;
}

// This function will be replaced with an API call in the future
async function fetchWatchedMovies(): Promise<Movie[]> {
  // Simulated API response
  return [
    { id: 1, title: "Inception", rating: 4.5, imageUrl: "/images/inception.jpg" },
    { id: 2, title: "The Shawshank Redemption", rating: 4.8, imageUrl: "/images/shawshank-redemption.jpg" },
    { id: 3, title: "Pulp Fiction", rating: 4.3, imageUrl: "/images/pulp-fiction.jpg" },
    { id: 4, title: "The Godfather", rating: 4.7, imageUrl: "/images/the-godfather.jpg" },
    { id: 5, title: "The Dark Knight", rating: 4.6, imageUrl: "/images/the-dark-knight.jpg" },
    { id: 6, title: "Forrest Gump", rating: 4.4, imageUrl: "/images/forrest-gump.jpg" },
  ];
}

export default async function FilmClubHome() {
  const watchedMovies = await fetchWatchedMovies();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Welcome to Lumina Film Club</h2>
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
                  <Image src={movie.imageUrl} alt={movie.title} width={150} height={200} className="w-full h-auto mb-2" />
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
  )
}