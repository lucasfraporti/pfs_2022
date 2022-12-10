import { Request, Response } from 'express';
import { subjectRepository } from '../repositories/subjectRepository';

export class SubjectController {
	async create(req: Request, res: Response) {
        // criando uma disciplina
		const { name } = req.body;
		if(!name) {
			return res.status(400).json({ message: 'O nome é obrigatório' });
		}
		try {
            // instancia a classe subject com a propriedade name com valor que foi passado no body
			const newSubject = subjectRepository.create({ name });
			await subjectRepository.save(newSubject);
            // status 201 é criação
			return res.status(201).json(newSubject);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Internal Server Error' });
		};
	};
};