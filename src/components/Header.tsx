import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Lumina Film Club</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/upcoming" className="hover:text-gray-300">Próximos Estrenos</Link></li>
            <li><Link href="/suggest" className="hover:text-gray-300">Sugerir una Película</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}