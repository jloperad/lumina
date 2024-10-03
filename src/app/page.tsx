import { Suspense } from 'react';
import { Button } from "@/components/ui/button"
import { WatchedMoviesSection } from '@/components/watched-movies-section';

export default function FilmClubHome() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Lumina Film Club</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Únete a nosotros semanalmente para explorar las obras maestras del cine, desde clásicos eternos hasta gemas contemporáneas.
        </p>
        <Button size="lg">Únete ahora</Button>      
        </section>

      <Suspense fallback={<div>Cargando películas...</div>}>
        <WatchedMoviesSection />
      </Suspense>
    </main>
  );
}