import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { Genre } from './interfaces/Genre';
import { api } from './services/api';

import './styles/global.scss';

export function App() {

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar 
        selectedGenreId={selectedGenreId}
        handleClickButton={handleClickButton}
      />
      <Content 
        selectedGenreId={selectedGenreId}
        selectedGenre={selectedGenre}
      />
    </div>
  )
}