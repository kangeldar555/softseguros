import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Grid, TextField, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ClientForm.css';
import useClients from '../../hooks/useClients';
import toast from 'react-hot-toast'; // Mensajes emergentes

interface Client {
  id: string;
  full_name: string;
  email: string;
  birth_date: string;
  creation_date: string
};

interface Props {
  data?: Client; // Datos del cliente a mostrar al iniciar el formulario
  className?: string;
  vertical?: boolean; // Maneja la presentación del formulario
  onSave?: () => void; // Función a ejecutar cuando se guarda el formulario
  onCancel?: () => void; // Función a ejecutar cuando se cancela el formulario
  editMode?: boolean; // Formulario en modo actualización de datos
}

const ClientForm = ({ data, className = '', vertical = false, onSave, onCancel, editMode = false }: Props) => {

  const navigate = useNavigate(); // Función navigate de react-router-dom

  const {createClient, updateClient} = useClients();

  const [formData, setFormData] = useState<Client>(() => {
    // Pasamos los valores iniciales del cliente para edición
    if (data) {
      return {...data}
    }

    // Pasamos los datos en blanco con la fecha actual para crear un cliente
    return {
      id: '',
      full_name: '',
      email: '',
      birth_date: '',
      creation_date: new Date().toISOString().split('T')[0]
    };
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Botón para guardar
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let errors: string[] | undefined;
    let message:string;

    // Verificamos si el submit es para crear cliente o para actualizarlo
    if (editMode) {
      // Actualizar cliente
      errors = await updateClient(formData)
      message = `El usuario ${formData.id} ha sido actualizado correctamente`
    } else {
      // Crear cliente
      errors = await createClient(formData); // retorna los errores si los hay
      message = `El usuario ${formData.full_name} ha sido creado correctamente`
    }

    if (errors) {
      // Su hay errores los muestra
      errors.forEach((error) => {
        toast.error(`${error}`, { duration: 5000 });
      });
    } else {
      // Si no hay errores muestra mensaje de éxito y se sale del formulario
      toast.success(`${message}`,{duration:5000})
      onSave?.(); // Salir desde la modal
      navigate('/client/list'); // Salir desde la página /client/create
    } 
  };

  // Botón cancelar
  const handleCancel = () => {
    onCancel?.(); // Salir desde la modal
    navigate('/client/list'); // Salir desde la página /client/create
  };

  return (
    <form className={`form-container ${className}`} onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={vertical ? 12 : 8}>
          <InputLabel>Nombre completo</InputLabel>
          <TextField
            name="full_name"
            placeholder="Nombre completo"
            value={formData.full_name}
            onChange={handleChange}            
            size={vertical ? 'small' : 'medium'}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={vertical ? 12 : 4}>
          <InputLabel>Número de documento</InputLabel>
          <TextField
            name="id"
            placeholder="Número de documento"
            type="number"
            value={formData.id}
            onChange={handleChange}
            size={vertical ? 'small' : 'medium'}
            fullWidth
            required
            disabled={editMode}
          />
        </Grid>
        <Grid item xs={12} sm={vertical ? 12 : 4}>
          <InputLabel>Fecha de nacimiento</InputLabel>
          <TextField
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleChange}
            size={vertical ? 'small' : 'medium'}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={vertical ? 12 : 8}>
          <InputLabel>Email</InputLabel>
          <TextField
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            size={vertical ? 'small' : 'medium'}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid className='form-container_buttons' container justifyContent="flex-end">   
        <Button onClick={handleCancel} variant="contained" color="error">
          Cancelar
        </Button>
        <Button variant="contained" type="submit" color="primary">
          Guardar
        </Button>
      </Grid>
    </form>
  )
}

export default ClientForm