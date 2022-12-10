import blogFetch from '../axios/config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import swal from 'sweetalert';
import "./NewPost.css";

const NewPost = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [nameRoom, setNameRoom] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [sid, setSID] = useState(0);
  const [registerClass, setRegisterClass] = useState(0);
  const [registerIdRoom, setRegisterIdRoom] = useState(0);

  const createSubject = async (e) => {
    e.preventDefault();
    await blogFetch.post(`/subject`, {
      name: name
    });
    swal({title: "Concluído!", text: `A disciplina ${name} foi cadastrada com sucesso.`, icon: "success"});
  }

  {/* ======================================================================================================================= */}

  const createPost = async (e) => {
    // evita o recarregamento da página
    e.preventDefault();
    await blogFetch.post(`/room`, {
      name: nameRoom,
      description: description
    });
    // faz o post e redireciona pra home
    navigate(`/`);
  }

  {/* ======================================================================================================================= */}

  const createRec = async (e) => {
    e.preventDefault();
    await blogFetch.post(`/room/`+registerClass+`/create`, {
      title: title,
      url: url
    });
    navigate(`/`);
  }

  {/* ======================================================================================================================= */}

  const linkMatter = async (e) => {
    e.preventDefault();
    await blogFetch.post(`/room/`+registerIdRoom+`/subject`, {
      subject_id: sid
    });
    swal({title: "Concluído!", text: `A disciplina (ID: ${registerIdRoom}) foi vinculada a sala (ID: ${sid})`, icon: "success"});
  }

  return (
  <div className='new-post'>
    <h2>Criação de uma nova disciplina</h2>
    <form onSubmit={(e) => createSubject(e)}>
      {/* Criar uma nova disciplina */}
      <div className='form-control'>
        <label htmlFor="name">Disciplina:</label>
        <input type="text" name='name' id='name' placeholder='Digite a disciplina' onChange={(e) => setName(e.target.value)}/>
      </div>
      <input type="submit" value="Criar" className='btn'/>
    </form>

    {/* ======================================================================================================================= */}

    <h2>Cadastro de uma aula</h2>
    <form onSubmit={(e) => createPost(e)}>
    <div className='form-control'>
        <label htmlFor="nameRoom">Nome da aula:</label>
        <input type="text" name='nameRoom' id='nameRoom' placeholder='Digite o nome da aula' onChange={(e) => setNameRoom(e.target.value)}/>
      </div>

      <div className='form-control'>
        <label htmlFor="description">Descrição da aula:</label>
        <input type="text" name='description' id='description' placeholder='Digite a descrição da aula' onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <input type="submit" value="Criar" className='btn'/>
    </form>

    {/* ======================================================================================================================= */}

    <h2>Cadastrar uma gravação para alguma aula</h2>
    <form onSubmit={(e) => createRec(e)}>
      {/* Vincular gravação com alguma aula já cadastrada */}
      <div className='form-control'>
        <label htmlFor="registerClass">Registro da aula (ID):</label>
        <input type="number" name='registerClass' id='registerClass' placeholder='Digite o ID da aula' onChange={(e) => setRegisterClass(e.target.value)}/>
      </div>

      <div className='form-control'>
        <label htmlFor="title">Título da gravação:</label>
        <input type="text" name='title' id='title' placeholder='Digite o título da gravação' onChange={(e) => setTitle(e.target.value)}/>
      </div>

      <div className='form-control'>
        <label htmlFor="url">Link da gravação:</label>
        <input type="text" name='url' id='url' placeholder='Digite o link da gravação' onChange={(e) => setUrl(e.target.value)}/>
      </div>
      <input type="submit" value="Criar" className='btn'/>
    </form>

    {/* ======================================================================================================================= */}

    <h2>Vincular alguma matéria já cadastrada com a aula</h2>
    <form onSubmit={(e) => linkMatter(e)}>
    {/* Vincular uma matéria existente com uma aula já existente */}
      <div className='form-control'>
        <label htmlFor="registerIdRoom">ID da disciplina:</label>
        <input type="number" name='registerIdRoom' id='registerIdRoom' placeholder='Digite o ID da aula' onChange={(e) => setRegisterIdRoom(e.target.value)}/>
      </div>
    
      <div className='form-control'>
        <label htmlFor="sid">ID da sala:</label>
        <input type="number" name='sid' id='sid' placeholder='Digite o ID da matéria' onChange={(e) => setSID(e.target.value)}/>
      </div>
      <input type="submit" value="Criar" className='btn'/>
    </form>
  </div>
  );
};

export default NewPost;