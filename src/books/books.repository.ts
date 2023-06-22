import { EntityRepository, Repository } from "typeorm";
import { Book } from "./book.entity";
import { User } from "src/auth/user.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { GetBooksFilterDto } from "./dto/get-books-filter.dto";
import { BookStatus } from "./book-status.enum";
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {

    private logger = new Logger('BooksRepository', true);
    async getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('book');
    
        if (status) {
            query.andWhere('book.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(LOWER(book.name) LIKE LOWER(:search) OR LOWER(book.author) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }
        try {
            const books = await query.getMany();
            return books;
        }
        catch (error) {
           
            throw new InternalServerErrorException();
        }}
        async createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
            const {name, author,numberOfBooks, status} = createBookDto;

            const book = this.create({
                name,
                author,
                status,
                numberOfBooks,
                user,
              
           
            });
            await this.save(book);
            return book;

        }

}