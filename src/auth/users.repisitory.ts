import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
@EntityRepository(User)
export class UsersRepisitory extends Repository<User>{
    async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentials;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('salt:', salt);
        console.log(hashedPassword);
        
        

        const user = this.create({ username, password: hashedPassword });
        try {
            await this.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            }
            else {
                throw new InternalServerErrorException('Something went wrong');
            }

           
        }
    }

}