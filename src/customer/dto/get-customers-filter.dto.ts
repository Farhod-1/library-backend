import { IsOptional, IsString} from 'class-validator';


export class GetCustomersFilterDto {
   
    @IsOptional()
    @IsString()
    search?: string;
    }