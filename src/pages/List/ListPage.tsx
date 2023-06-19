import { useRef, useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar';
import ClientsList from '../../components/ClientsList/ClientsList';
import ClientForm from '../../components/ClientForm/ClientForm';
import { Button, Modal} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import './ListPage.css';

import useClients from '../../hooks/useClients';
import toast from 'react-hot-toast'; // Mensajes emergentes

interface Client {
  id: string;
  full_name: string;
  email: string;
  birth_date: string;
  creation_date: string;
}

const List = () => {

  const [openModal, setOpenModal] = useState(false); 
  const [clientUpdate, setClientUpdate] = useState<Client>(); // Datos de cliente a actualizar
  const isFirstRender = useRef<boolean>(true);
  const searchRef = useRef<string>(''); // Referencia de la ultima búsqueda

  const { clients, getClients, deleteClient} = useClients();
  
  // Devuelve la base de datos completa en el primer renderizado del componente
  if (isFirstRender.current) {
    isFirstRender.current = false;
    getClients('');
  } 

  // Búsqueda clientes
  const handleSearch = (value:string) => {
    searchRef.current = value;
    
    getClients(value);
  }

  // Botón eliminar cliente
  const handleDelete = async (id:string, name: string) => {
    await deleteClient(id);
    await getClients(searchRef.current)
    toast.success(`El usuario ${name} ha sido eliminado correctamente`, {duration:5000})    
  }

  // Botón editar cliente
  const handleUpdate = (client: Client) => {  
    setOpenModal(true)
    setClientUpdate(client);
  }

  // Botón cancelar en formulario (modal)
  const handleCancelModal = () => {
    setOpenModal(false);
  };

  // Botón guardar en formulario (modal)
  const handleSaveModal = async () => {
    //await getClients(searchRef.current)    
    await toast.promise(
      getClients(searchRef.current),
       {
         loading: 'Saving...',
         success: <b>Settings saved!</b>,
         error: <b>Could not save.</b>,
       }
     );
    handleCancelModal();
  };

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
        <ClientsList clients={clients} onDeleteClient={handleDelete} onEditClient={handleUpdate} />      
      </main>      
      <Modal className='form-modal' hideBackdrop open={openModal}>
        <>
          <h2 className='content'>Actualizar información del cliente</h2>
          <ClientForm className='client-form content' vertical={true} data={clientUpdate} onSave={handleSaveModal} onCancel={handleCancelModal} editMode={true}/>
        </>      
      </Modal>
    </div>
  );
};

export default List;