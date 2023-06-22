import { IsNotEmpty } from "class-validator";
import { BookStatus } from "../book-status.enum";

export class CreateBookDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    status: BookStatus;

    @IsNotEmpty()
    numberOfBooks: number;
    
}