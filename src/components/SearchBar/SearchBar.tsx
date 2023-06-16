import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';
import useClients from '../../hooks/useClients';

type Props = {
  onSearch:(value:string) => void;
}

const SearchBar = ({onSearch}: Props) => {

  const [search, setSearch] = useState('');

  const handleChange = (event: any) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    onSearch(newSearch);
  }

  return (
    <div className='search-bar-container'>
      <SearchIcon className='search-bar-container__icon'/>
      <input className='search-bar-container__input' onChange={handleChange} value={search} placeholder='Buscar...' />
    </div>
  )
}

export default SearchBar
