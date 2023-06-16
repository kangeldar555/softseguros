import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar';
import ClientsList from '../../components/ClientsList/ClientsList';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import './ListPage.css';

import useClients from '../../hooks/useClients';

interface Client {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
  creationDate: string;
}

const List = () => {

  const { clients, getClients } = useClients();

  const handleSearch = (value:string) => {
    getClients(value);
  }

  // Eliminar cliente
  const handleDelete = (id:string) => {
    console.log(id)
  }

  //Editar cliente
  const handleEdit = (client: Client) => {
    console.log(client)
  }

  return (
    <div className='list-container'>
      <header className='list-container_header'>
        <h1>Listado clientes</h1>
        <Link className='list-container_link' to='/client/create' >
          <Button className='list-container_button' variant="contained">
            <AddIcon sx={{width: '20px'}}/> Nuevo cliente
          </Button>
        </Link>
      </header>
      <main>
        <SearchBar onSearch={handleSearch}/>
        <ClientsList clients={clients} onDeleteClient={handleDelete} onEditClient={handleEdit} />      
      </main>
    </div>
  );
};

export default List;