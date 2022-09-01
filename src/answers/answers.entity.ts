import {Entity, PrimaryGeneratedColumn, JoinTable, OneToMany, OneToOne, JoinColumn, Column} from 'typeorm';
import {User} from "../users/users.entity";
import {Questions} from "../questions/questions.entity";

@Entity('answers')
export class Answers {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToOne(() => Questions)
    @JoinColumn()
    question: Questions;

    @Column({
        nullable: false
    })
    answers: [string];

    @Column({
        nullable: false
    })
    result: number;

    @Column({type: 'timestamptz'})
    dt: Date;
}