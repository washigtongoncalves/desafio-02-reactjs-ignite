import { useEffect, useState } from 'react';

import { Button } from './Button';
import { Genre } from '../interfaces/Genre';
import { api } from '../services/api';

import '../styles/sidebar.scss';

interface SideBarProps {
  handleClickButton: Function, 
  selectedGenreId: number
}

export function SideBar({ handleClickButton, selectedGenreId }: SideBarProps) {

  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}