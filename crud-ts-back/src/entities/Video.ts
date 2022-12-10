import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './Room';

@Entity('videos')
export class Video {
    // auto incremento e chave primária
	@PrimaryGeneratedColumn()
	id: number

    // nullable: true - para campos não obrigatórios, mas nesse caso é obrigatório
	@Column({ type: 'text' })
	title: string

	@Column({ type: 'text' })
	url: string

    // relacionamento: muitos vídeos em uma sala --- uma sala pode ter vários vídeos
	@ManyToOne(() => Room, room => room.videos)
    // passa um objeto e diz como é o nome da chave estrangeira no banco de dados
	@JoinColumn({ name: 'room_id' })
	room: Room
};