import './globals.css' // Asegúrate de tener los estilos globales
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lumina Film Club',
  description: 'Keep track of movies watched in your film club',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-gray-900 text-gray-100 ${inter.className}`}>
        <Header />
        <div className="pt-16"> {/* Add padding top for logo space */}
          {children}
        </div>
        <footer className="bg-gray-800 py-4 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 Lumina Film Club. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

