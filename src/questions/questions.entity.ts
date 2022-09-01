import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('questions')
export class Questions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
            nullable: false
        }
    )
    question: string;

    @Column({
        nullable: false
    })
    answers: [string];

    @Column({
        nullable: true
    })
    correct_answer: number;
}