import { useEffect, useState } from 'react';

import { MovieCard } from './MovieCard';
import { Movie } from '../interfaces/Movie';
import { Genre } from '../interfaces/Genre';
import { api } from '../services/api';

import '../styles/content.scss';

interface ContentProps {
  selectedGenreId: number;
  selectedGenre: Genre
}

export function Content({ selectedGenreId, selectedGenre }: ContentProps) {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);


  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard 
              key={movie.imdbID} 
              title={movie.Title} 
              poster={movie.Poster} 
              runtime={movie.Runtime} 
              rating={movie.Ratings[0].Value} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}