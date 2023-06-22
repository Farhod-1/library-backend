import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';
import { BookStatus } from './book-status.enum';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
    private logger = new Logger('BooksController', true);
    
    constructor(private booksService: BooksService) { }
    
    @Get()
    getBooks(
        @Query() filterDto: GetBooksFilterDto,
        @GetUser() user: User,
        
    ): Promise<Book[]> {
        this.logger.verbose(`User "${user.username}" retrieving all books. Filters: ${JSON.stringify(filterDto)}`)
        return this.booksService.getBooks(filterDto);
    }
    
    @Get('/:id')
    getBookById(@Param('id') id: string): Promise<Book> {
        return this.booksService.getBookById(id);
    }
    
    @Post('add')
    createBook(
        @Body() createBookDto: CreateBookDto,
        @GetUser() user: User,
    ): Promise<Book> {
    
        this.logger.verbose(`User "${user.username}" creating a new book. Data: ${JSON.stringify(createBookDto)}`)
        
        return this.booksService.createBook(createBookDto, user);
    }
    
    @Delete('/:id')
    deleteBook(@Param('id') id: string): Promise<void> {
       
        return this.booksService.deleteBook(id);
    }
    
    @Patch('/:id/status')
    updateBookStatus(
        @Param('id') id: string,
        @Body() updateBookStatusDto: UpdateBookStatusDto,
        @GetUser() user: User,
    ): Promise<Book> {
        const { status } = updateBookStatusDto;
        return this.booksService.updateBookStatus(id, status);
    }
    }