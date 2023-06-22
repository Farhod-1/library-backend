import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { User } from 'src/auth/user.entity';
import { BookStatus } from './book-status.enum';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BooksRepository)
        private booksRepository: BooksRepository,
    ) {}

    async getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
        return this.booksRepository.getBooks(filterDto);
    }

    async getBookById(id: string): Promise<Book> {
        const found = await this.booksRepository.findOne({ where: { id } });

        if (!found) {
            throw new NotFoundException(`Book with ID "${id}" not found`);
        }

        return found;
    }

    async createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
        return this.booksRepository.createBook(createBookDto, user);
    }

    async deleteBook(id: string): Promise<void> {
        const result = await this.booksRepository.delete({ id});

        if (result.affected === 0) {
            throw new NotFoundException(`Book with ID "${id}" not found`);
        }
    }

    async updateBookStatus(
        id: string,
        status: BookStatus,
    
    ): Promise<Book> {
        const book = await this.getBookById(id);
        book.status = status;
        await this.booksRepository.save(book);
        return book;
    }
}

// @Injectable()
// export class BooksService {  
//     constructor(
//         @InjectRepository(Book)
//         private booksRepository: BooksRepository,
//     ) { }
//     getBooks(filterDto: GetBooksFilterDto, user: User): Promise<Book[]> {
//         return this.booksRepository.getBooks(filterDto, user);
//     }
//     async getBookById(id: string, user: User): Promise<Book> {
//         const found = await this.booksRepository.findOne({ where: { id, user } });
//         return found;
//     }
//     createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
//         return this.booksRepository.createBook(createBookDto, user);
//     }
//     async deleteBook(id: string, user: User): Promise<void> {
//         const result = await this.booksRepository.delete({ id, user });
//         if (result.affected === 0) {
//             throw new NotFoundException(`Book with ID "${id}" not found`);
//         }
//     }
//     async updateBookStatus(id: string, status: BookStatus, user: User): Promise<Book> {
//         const book = await this.getBookById(id, user);
//         book.status = status;
//         await this.booksRepository.save(book);
//         return book;
//     }
// }