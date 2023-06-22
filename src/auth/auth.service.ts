import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersRepisitory } from './users.repisitory';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepisitory)
        private logger = new Logger('UsersRepository', true),
        private usersRepisitory: UsersRepisitory,
        private jwtService: JwtService,
    ) { }
        async getProfile(username: string): Promise<any> {
            return username;
        }




    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepisitory.createUser(authCredentialsDto);
    }




    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepisitory.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            
            const accessToken: string = this.jwtService.sign(payload);
            console.log(accessToken);
            return { accessToken };
           
           
        }
        else {
            throw new UnauthorizedException('Please check your login credentials');
            
        }
    }

}