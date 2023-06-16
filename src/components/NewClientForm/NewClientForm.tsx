import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Grid, TextField, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import './NewClientForm.css';

type Client = {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
};

const NewClientForm = () => {

  const [formData, setFormData] = useState<Client>({
    id: '',
    fullName: '',
    email: '',
    birthDate: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Data nuevo cliente
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Datos para enviar
    console.log(formData)
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <InputLabel>Nombre completo</InputLabel>
          <TextField
            name="fullName"
            placeholder="Nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel>Número de documento</InputLabel>
          <TextField
            name="id"
            placeholder="Número de documento"
            type="number"
            value={formData.id}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel>Fecha de nacimiento</InputLabel>
          <TextField
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <InputLabel>Email</InputLabel>
          <TextField
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid className='form-container_buttons' container justifyContent="flex-end">
        <Link to='/client/list' >
          <Button variant="contained" color="error">
            Cancelar
          </Button>
        </Link>
        <Button variant="contained" type="submit" color="primary">
          Guardar
        </Button>
      </Grid>
    </form>
  )
}

export default NewClientForm