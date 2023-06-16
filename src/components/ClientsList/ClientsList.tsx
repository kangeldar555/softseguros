import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Grid, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './ClientsList.css';

interface Client {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
  creationDate: string;
}

interface ClientListProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
  onDeleteClient: (clientId: string) => void;
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
                      <strong>{client.fullName}</strong>
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
                          {client.birthDate}
                        </Grid>
                        <Grid className='client-list-container_info' item xs={12} sm={3}>
                          <strong>Fecha de creación:</strong>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          {client.creationDate}
                        </Grid>
                      </Grid>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton className='clients-list-container_button' edge="end" aria-label="Edit" onClick={() => onEditClient(client)}>
                    <Edit />
                  </IconButton>
                  <IconButton className='clients-list-container_button' edge="end" aria-label="Delete" onClick={() => onDeleteClient(client.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < clients.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        : <p>No hay clientes</p>
      }
    </div>
  );
};

export default ClientsList;
