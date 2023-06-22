import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookStatus } from './book-status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    author: string;
    
    @Column()
    status: BookStatus;

    @Column()
    numberOfBooks: number;

  
    
    @ManyToOne((_type) => User, user => user.books, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User; 
    }