import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repositoty';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,

    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return await this.userRepository.signUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        const username = this.userRepository.validateUserPassword(authCredentialsDto)

        if(!username) {
            throw new UnauthorizedException("Invalid Credentials");
    }

        const payload = {username};
        const accessToken =  this.jwtService.sign(payload)
        return {accessToken};
    }
}
