'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { searchMovies, SearchMovie, saveSuggestion } from '@/services/movieApi'

export default function SuggestMovie() {
  const [name, setName] = useState('')
  const [movie, setMovie] = useState('')
  const [year, setYear] = useState('')
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [currentOption, setCurrentOption] = useState(0)
  const [movieOptions, setMovieOptions] = useState<SearchMovie[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && movie && reason) {
      setIsLoading(true)
      try {
        const searchResults = await searchMovies(movie, year)
        if (searchResults.length > 0) {
          setMovieOptions(searchResults)
          setSubmitted(true)
          toast.success('Búsqueda de sugerencia de película completada')
        } else {
          toast.warning('No se encontraron películas. Por favor, intente con otro título.')
        }
      } catch (error) {
        console.error('Error searching movies:', error)
        toast.error('Error al buscar películas. Por favor, inténtelo de nuevo.')
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.error('Por favor, complete todos los campos requeridos')
    }
  }

  const handleConfirm = async () => {
    try {
      await saveSuggestion({
        name,
        movie: movieOptions[currentOption],
        reason,
      })
      setConfirmed(true)
      toast.success('¡Sugerencia confirmada y guardada!')
    } catch (error) {
      console.error('Error saving suggestion:', error)
      toast.error('Error al guardar la sugerencia. Por favor, inténtelo de nuevo.')
    }
  }

  const handleCancel = () => {
    setSubmitted(false)
    setCurrentOption(0)
  }

  const handleNext = () => {
    setCurrentOption((prev) => (prev + 1) % movieOptions.length)
  }

  const handlePrevious = () => {
    setCurrentOption((prev) => (prev - 1 + movieOptions.length) % movieOptions.length)
  }

  const handleSuggestAnother = () => {
    setName('')
    setMovie('')
    setYear('')
    setReason('')
    setSubmitted(false)
    setConfirmed(false)
    setCurrentOption(0)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Sugerir una Película</h1>

        {!submitted ? (
          <div className="max-w-md mx-auto space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-300">Tu Nombre</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="movie" className="text-sm font-medium text-gray-300">Título de la Película</Label>
                <Input
                  id="movie"
                  value={movie}
                  onChange={(e) => setMovie(e.target.value)}
                  required
                  className="bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-gray-300">Año (Opcional)</Label>
                <Input
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-medium text-gray-300">Razón para Sugerir</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Buscando...' : 'Enviar Sugerencia'}
              </Button>
            </form>
          </div>
        ) : confirmed ? (
          <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">¡Gracias por su sugerencia!</h2>
            <p className="mb-6">Su recomendación de "{movieOptions[currentOption].title}" ha sido registrada.</p>
            <Button onClick={handleSuggestAnother} className="bg-blue-600 hover:bg-blue-700">
              Recomendar otra vez
            </Button>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg relative">
            <Button
              onClick={handleCancel}
              className="absolute top-2 right-2 p-2 bg-transparent hover:bg-gray-700 rounded-full"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cancelar</span>
            </Button>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button onClick={handlePrevious} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full">
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Opción anterior</span>
                </Button>
                <div className="flex-1 flex justify-center">
                  <Image
                    src={movieOptions[currentOption].imageUrl}
                    alt={movieOptions[currentOption].title}
                    width={200}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <Button onClick={handleNext} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full">
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Siguiente opción</span>
                </Button>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-semibold">{movieOptions[currentOption].title}</h2>
                <p className="text-gray-400 mt-1">{movieOptions[currentOption].year}</p>
              </div>
              <Button onClick={handleConfirm} className="w-full bg-green-600 hover:bg-green-700">Confirmar Sugerencia</Button>
            </div>
          </div>
        )}
      </main>

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  )
}