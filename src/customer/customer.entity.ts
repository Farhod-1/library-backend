import { Book } from 'src/books/book.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    phonenumber: string;

    @OneToMany((_type) => Book, book => book.user, { eager: true })
    books: Book[];

}


