import React, { useRef } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Grid, CircularProgress} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './ClientsList.css';

interface Client {
  id: string;
  full_name: string;
  email: string;
  birth_date: string;
  creation_date: string;
}
interface ClientListProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
  onDeleteClient: (clientId: string, clientName: string) => void;
}

const DatabaseStatusMessage = () => {
  const isFirstRenderRef = useRef<boolean>(true);

  // Mensaje de carga y resultado de la búsqueda de la base de datos
  if(isFirstRenderRef.current) {
    isFirstRenderRef.current = false;
    return <CircularProgress />
  }
  else {
    return <p>No hay clientes</p>
  }
}

const ClientsList = ({ clients, onEditClient, onDeleteClient }: ClientListProps) => {

  const hasClients = clients?.length > 0;
  return (
    <div className='clients-list-container'>
      {hasClients
        ?
        <List className='clients-list-container_list'>
          {clients.map((client, index) => (
            <React.Fragment key={client.id}>
              <ListItem>
                <ListItemText
                  className='clients-list-container_text'
                  primary={
                    <>
                      <strong>{client.full_name}</strong>
                      <Grid className='client-list-container_text-grid' alignItems="center" container spacing={0.5}>
                        <Grid className='client-list-container_info' item xs={12} sm={3}>
                          <strong>Email:</strong>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          {client.email}
                        </Grid>
                        <Grid className='client-list-container_info' item xs={12} sm={3}>
                          <strong>Fecha de nacimiento:</strong>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          {client.birth_date}
                        </Grid>
                        <Grid className='client-list-container_info' item xs={12} sm={3}>
                          <strong>Fecha de creación:</strong>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          {client.creation_date}
                        </Grid>
                      </Grid>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                  className='clients-list-container_button'
                  edge="end" aria-label="Update"
                  onClick={() => onEditClient(client)}
                  title='Actualizar'
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                  className='clients-list-container_button'
                  edge="end"
                  aria-label="Delete"
                  onClick={() => onDeleteClient(client.id, client.full_name)}
                  title='Eliminar'
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < clients.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        : <DatabaseStatusMessage/>
      }
    </div>
  );
};

export default ClientsList;
