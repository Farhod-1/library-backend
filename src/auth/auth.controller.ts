import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller()
export class AuthController {
    private logger = new Logger('BooksController', true);
    constructor(private authService: AuthService) { }

    @Post('/auth/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        
        return this.authService.signUp(authCredentialsDto);
        

    }
    @Post('/auth/login')
    
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        this.logger.verbose(`User "${authCredentialsDto.username}" signing in. Data: ${JSON.stringify(authCredentialsDto)}`);
        
        return this.authService.signIn(authCredentialsDto);
    }
    @Get('profile')

    getProfile(@Body() username: string): Promise<any> {
        this.logger.verbose(`User "${username}" signing in. Data: ${JSON.stringify(username)}`);
        return this.authService.getProfile(username);
    }

    
 
    



}
