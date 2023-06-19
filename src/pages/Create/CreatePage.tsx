import './CreatePage.css';
import ClientForm from '../../components/ClientForm/ClientForm'

const Create = () => {
  return (
    <div className='create-container'>
    <header className='create-container_header'>
      <h1>Nuevo cliente</h1>
    </header>
    <main>
      <ClientForm/>
    </main>
    </div>
  );
};

export default Create;
