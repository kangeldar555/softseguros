import { useState } from 'react'
import { getClientsApi, createClientApi, updateClientApi, deleteClientApi } from '../apis/apiClients'

const useClients = () => {

  const [clients, setClients] = useState([]);

  // Función buscar clientes
  const getClients = async (search: string) => {
    const newClients = await getClientsApi(search);
    setClients(newClients)
  }

  // Función eliminar
  const deleteClient = async (id: string) => {
      await deleteClientApi(id);
  }

  // Función crear cliente
  const createClient = async (newClient: object) => {
    try {
      await createClientApi(newClient);
    } catch (error: any) {
      // Manejo de errores
      let errors:string[] = [];
      if (error.response && error.response.status === 400) {
        const { id = '', email = '' } = error.response.data;
        if (id && id.includes('Ensure this field has no more than 10 characters.')) {
            errors.push('Número de documento demasiado largo')
          }

        if (id && id.includes('client with this id already exists.')) {
          errors.push('El número de documento ya existe en la base de datos')
        }          
        
        if (email && email.includes('Enter a valid email address.')) {
          errors.push('Introduzca un email válido')
        }
      }
      if (errors) {
        return errors
      } else {
        throw new Error('Error creating client');
      }
    };
  }

  // Función actualizar cliente
  const updateClient = async (updateClient: {[key: string]: any; id: string; }) => {
    try {
      await updateClientApi(updateClient);
    } catch (error: any) {
      // Manejo de errores
      let errors:string[] = [];
      if (error.response && error.response.status === 400) {
        const { email = '' } = error.response.data;      
        if (email && email.includes('Enter a valid email address.')) {
          errors.push('Introduzca un email válido')
        }
      }
      if (errors) {
        return errors
      } else {
        throw new Error('Error updating client');
      }
    };
  }

  return { clients, getClients, deleteClient, createClient, updateClient }
}

export default useClients