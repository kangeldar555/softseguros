import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// Petición para hacer búsquedas
export const getClientsApi = async ( search: string ) => {

    try {
        const res = await axios.get(`${apiUrl}api/v1/clients/?search=${search}`)        
        const data = res.data; // Accedemos a la data de la petición
        return data; // Devuelve el contenido de la base de datos en un objeto JSON
    } catch (error) {
        throw new Error('Error searching clients');
    }
}

// Petición para borrado lógico
export const deleteClientApi = async (id: string) => {
    const data = {
      deleted: true
    };

    try {
      const res = await axios.patch(`${apiUrl}api/v1/clients/${id}/`, data);
      const updatedClient = res.data;
      return updatedClient;
    } catch (error) {
      throw new Error('Error deleting client');
    }
  }

// Petición para crear cliente
export const createClientApi = async (data: object) => {
    try {
      const res = await axios.post(`${apiUrl}api/v1/clients/`, data);
      const createdClient = res.data;
      return createdClient;
    } catch (error) {
      throw error;
    }
  }

// Actualización de datos de cliente
export const updateClientApi = async (data: { id: string; [key: string]: any }) => {

    try {
      const res = await axios.patch(`${apiUrl}api/v1/clients/${data.id}/`, data);
      const updatedClient = res.data;
      return updatedClient;
    } catch (error) {
      throw error;
    }
  }