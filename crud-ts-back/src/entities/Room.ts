import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './Subject';
import { Video } from './Video';

@Entity('rooms')
export class Room {
    // auto incremento e chave primária
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text' })
	name: string

    // este campo pode ser nulo
	@Column({ type: 'text', nullable: true })
	description: string

    // uma aula para vários vídeos, contrário do video.ts
	@OneToMany(() => Video, video => video.room)
    // vídeos vai trazer um array de vídeos que faz relacionamento com rooms
	videos: Video[]

	@ManyToMany(() => Subject, subject => subject.rooms)
	subjects: Subject[]
}