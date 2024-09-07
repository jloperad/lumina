'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SuggestMovie() {
  const [name, setName] = useState('')
  const [movie, setMovie] = useState('')
  const [reason, setReason] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && movie && reason) {
      // In a real application, you would send this data to your backend
      console.log({ name, movie, reason })
      toast.success('Movie suggestion submitted successfully!')
      setName('')
      setMovie('')
      setReason('')
    } else {
      toast.error('Please fill in all fields')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Suggest a Movie</h1>

        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Movie Suggestion Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="movie" className="block text-sm font-medium mb-1">Movie Title</label>
                <Input
                  id="movie"
                  type="text"
                  placeholder="Enter the movie title"
                  value={movie}
                  onChange={(e) => setMovie(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason for Suggestion</label>
                <Textarea
                  id="reason"
                  placeholder="Why do you think we should watch this movie?"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Submit Suggestion</Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  )
}