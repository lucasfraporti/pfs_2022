import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './Room';

// nome da tabela no bd vai ser subjects
// disciplinas
@Entity('subjects')
export class Subject {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text' })
	name: string

    // relacionamento de muitos para muitos em disciplinas
    // muitas aulas podem ter várias disciplinas
	@ManyToMany(() => Room, room => room.subjects)
    // configuração da tabela ternária -- fazer ligação de uma tabela com outras duas
	@JoinTable({
        // nome da tabela de ligação
		name: 'room_subject',
        // qual é a coluna que vai fazer a ligação com a próxima entidade
		joinColumn: {
            // nome da coluna que vai se juntar com a outra entidade
			name: 'room_id',
            // qual é o campo que vai referenciar na tabela
			referencedColumnName: 'id',
		},
        // inverso do que foi feito acima
		inverseJoinColumn: {
			name: 'subject_id',
			referencedColumnName: 'id',
		},
	})
	rooms: Room[]
};