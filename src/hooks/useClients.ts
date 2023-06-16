import React, { useState } from 'react'
import dataClients from '../mocks/dataClients.json'

type Props = {
  search: string
}

const useClients = () => {
  const [clients, setClients] = useState<any>([]);

  const getClients = (search:string) => {
    //Aquí va la consulta
    if (search) {
      setClients(dataClients)
    } else {
      setClients([])      
    }
  }

  return { clients, getClients }
}

export default useClients