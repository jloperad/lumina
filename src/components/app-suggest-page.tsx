'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export function Page() {
  const [name, setName] = useState('')
  const [movie, setMovie] = useState('')
  const [year, setYear] = useState('')
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [currentOption, setCurrentOption] = useState(0)

  // Mock movie options (in a real app, these would come from an API)
  const movieOptions = [
    { title: "Inception", year: "2010", image: "/placeholder.svg?height=300&width=200" },
    { title: "The Shawshank Redemption", year: "1994", image: "/placeholder.svg?height=300&width=200" },
    { title: "The Godfather", year: "1972", image: "/placeholder.svg?height=300&width=200" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && movie && reason) {
      // In a real application, you would send this data to your backend and fetch movie options
      console.log({ name, movie, year, reason })
      setSubmitted(true)
    }
  }

  const handleConfirm = () => {
    // In a real application, you would finalize the submission here
    setName('')
    setMovie('')
    setYear('')
    setReason('')
    setSubmitted(false)
    setCurrentOption(0)
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-2xl font-semibold">Film Club</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Suggest a Movie</h1>

        {!submitted ? (
          <div className="max-w-md mx-auto space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="movie" className="text-sm font-medium text-gray-300">Movie Title</Label>
                <Input
                  id="movie"
                  value={movie}
                  onChange={(e) => setMovie(e.target.value)}
                  required
                  className="bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-gray-300">Year (Optional)</Label>
                <Input
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-medium text-gray-300">Reason for Suggestion</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Submit Suggestion</Button>
            </form>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg relative">
            <Button
              onClick={handleCancel}
              className="absolute top-2 right-2 p-2 bg-transparent hover:bg-gray-700 rounded-full"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cancel</span>
            </Button>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button onClick={handlePrevious} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full">
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous option</span>
                </Button>
                <div className="flex-1 flex justify-center">
                  <Image
                    src={movieOptions[currentOption].image}
                    alt={movieOptions[currentOption].title}
                    width={200}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <Button onClick={handleNext} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full">
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next option</span>
                </Button>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-semibold">{movieOptions[currentOption].title}</h2>
                <p className="text-gray-400 mt-1">{movieOptions[currentOption].year}</p>
              </div>
              <Button onClick={handleConfirm} className="w-full bg-green-600 hover:bg-green-700">Confirm Suggestion</Button>
            </div>
          </div>
        )}
      </main>

      <footer className="py-6 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 Film Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}