# Lumina Film Club

![Lumina Films](/public/Lumina-home.png)

Live at [Lumina Films](https://lumina-films.vercel.app/)

## Overview
Lumina Film Club is a web application designed to manage and organize a film club's activities. It allows members to track watched movies, suggest new films, and plan upcoming screenings. The platform serves as a central hub for film enthusiasts to engage with their community and discover new cinema.

## Features

### 1. Movie Tracking
- Display recently watched movies with ratings and watch dates
- Detailed movie information including director, year, and genre
- Visual gallery with movie posters and hover effects
- Rating system for community feedback

### 2. Movie Suggestions
- Members can suggest movies for future screenings
- Integration with TMDB API for accurate movie data
- Voting system for suggested movies
- Reason tracking for movie suggestions
- Visual confirmation of suggestions with movie posters

### 3. Upcoming Screenings
- Calendar of planned movie screenings
- Detailed information about upcoming films
- Introduction notes for context about chosen films
- Navigation through planned screenings

## Technology Stack

### Frontend
- **Next.js 14**: React framework for the application
- **TypeScript**: Type-safe programming
- **TailwindCSS**: Styling and responsive design
- **Shadcn/ui**: UI component library
- **SWR**: Data fetching and caching
- **React-Toastify**: Toast notifications

### Backend
- **Supabase**: Database and backend services
- **TMDB API**: External movie data source


## Setup and Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

4. Run the development server:
```bash
npm run dev
```

## API Integration

### TMDB API
The application uses The Movie Database (TMDB) API for:
- Movie search functionality
- Fetching movie details
- Retrieving movie posters and metadata


## Deployment

The application can be deployed using Vercel or any other Next.js-compatible hosting platform. Build the production version using:

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

