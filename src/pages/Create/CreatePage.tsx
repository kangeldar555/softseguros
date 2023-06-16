import React from 'react';
import './CreatePage.css';
import NewClientForm from '../../components/NewClientForm/NewClientForm';


const Create = () => {
  return (
    <div className='create-container'>
    <header className='create-container_header'>
      <h1>Nuevo cliente</h1>
    </header>
    <main>
      <NewClientForm/>
    </main>
    </div>
  );
};

export default Create;
