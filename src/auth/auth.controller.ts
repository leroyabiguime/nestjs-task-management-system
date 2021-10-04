import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ok } from 'assert';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
   async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void>{
       return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialsDto);
    }

    @UseGuards(AuthGuard())
    @Get('/come')
    async here(){
        return "ok that is";
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req)
    }
}
