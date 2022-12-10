import { Request, Response } from 'express'
import { roomRepository } from '../repositories/roomRepository'
import { subjectRepository } from '../repositories/subjectRepository'
import { videoRepository } from '../repositories/videoRepository'

export class RoomController {
	async create(req: Request, res: Response) {
        // criação de uma sala
		const { name, description } = req.body;
        if(!name) {
			return res.status(400).json({ message: 'O nome é obrigatório' });
		};
		try {
			const newRoom = roomRepository.create({ name, description });
			await roomRepository.save(newRoom);
			return res.status(201).json(newRoom);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Erro interno do servidor' });
		};
	};

	async createVideo(req: Request, res: Response) {
        // criação de um vídeo
		const { title, url } = req.body;
		const { idRoom } = req.params;
        if(!title && !url) {
			return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
		};
		try {
            // verificando se a aula existe
			const room = await roomRepository.findOneBy({ id: Number(idRoom) });
			if (!room) {
				return res.status(404).json({ message: 'Aula não existe' });
			};
            // ele passa a room por causa do relacionamento da tabela
			const newVideo = videoRepository.create({title, url, room});
			await videoRepository.save(newVideo);
			return res.status(201).json(newVideo);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Erro interno do servidor' });
		};
	};

	async roomSubject(req: Request, res: Response) {
        // criação de uma sala
		const { subject_id } = req.body
		const { idRoom } = req.params
		try {
			const room = await roomRepository.findOneBy({ id: Number(idRoom) })
			if (!room) {
				return res.status(404).json({ message: 'Aula não existe' })
			}
            // busca uma disciplina onde o id é igual ao subject_id
			const subject = await subjectRepository.findOneBy({
				id: Number(subject_id),
			})
			if (!subject) {
				return res.status(404).json({ message: 'Disciplina não existe' })
			}
			const roomUpdate = {
                // quero adicionar na atualização todo o objeto que tem dentro de room
                // spread operator é usado para argumentos de método na forma de parâmetro em que o valor esperado é maior que 1
				...room,
				subjects: [subject],
			}
            // pode adicionar mais de um, por isso é um array
            // várias disciplinas de uma vez para uma aula ou várias aula para um disciplina
			await roomRepository.save(roomUpdate)
            // status 204 pq não tem nenhum conteúdo "204 - No Content"
			return res.status(204).send()
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Erro interno do servidor' })
		}
	}

	async list(req: Request, res: Response) {
        // listagem das salas de aula
		try {
            // mostrar os relacionamentos que eu quero trazer da sala
			const rooms = await roomRepository.find({
				relations: {
					subjects: true,
					videos: true,
				},
			})
			return res.json(rooms)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Erro interno do servidor' })
		}
	}
}