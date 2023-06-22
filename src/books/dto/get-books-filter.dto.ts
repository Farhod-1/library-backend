import {IsEnum, IsOptional, IsString} from 'class-validator';
import { BookStatus } from '../book-status.enum';

export class GetBooksFilterDto {
    @IsOptional()
    @IsEnum(BookStatus)
    status?: BookStatus;
    
    @IsOptional()
    @IsString()
    search?: string;

   

    }