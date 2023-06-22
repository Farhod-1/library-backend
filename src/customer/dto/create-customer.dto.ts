import { IsString,  MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    @IsString()
    @MinLength(8)
    @MaxLength(20) 
    password: string;

    @IsString()
    @MinLength(10)
    @MaxLength(15)
    phonenumber: string;

    
    

} 