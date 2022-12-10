import { Router } from 'express';
import { RoomController } from './controllers/RoomController';
import { SubjectController } from './controllers/SubjectController';

const routes = Router();

// localhost:3000/subject - criação de uma disciplina (parâmetro: name)
routes.post('/subject', new SubjectController().create);

// localhost:3000/room - criação de uma aula (parâmetros: name, description)
routes.post('/room', new RoomController().create);

// localhost:3000/room - listagem aulas
routes.get('/room', new RoomController().list);

// localhost:3000/room/1/create - criação de um vídeo pra uma aula (parâmetros: title, url)
routes.post('/room/:idRoom/create', new RoomController().createVideo);

// localhost:3000/room/1/subject - criação de uma disciplina pra uma aula (parâmetros: subject_id)
routes.post('/room/:idRoom/subject', new RoomController().roomSubject);

export default routes;