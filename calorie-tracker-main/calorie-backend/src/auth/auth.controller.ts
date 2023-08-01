import { Body, Controller, Get, Patch, Post, Req, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dtos/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Public } from '../decorators/public/public.decorator';
import { registerUserDto } from './dtos/registerUser.dto';

@Controller('/')
export class AuthController {
    constructor(private readonly authService: AuthService, private jwtService:JwtService ) {  }
    
    @Public()
    @Post('login')
    async loginUser(@Body() loginData: loginUserDto) {
        let result = await this.authService.loginUser(loginData)
        if (!result) {
            return new UnauthorizedException("User Not Found Please Create a Account First!")
        }
        const jwt = await this.jwtService.signAsync({ email: result.email, uid: result._id })
        return {
            token: jwt
        }
    }
    
    @Public()
    @Post('createUser')
    async createUser(@Body() newUserData: registerUserDto) {
        let result = await this.authService.registerUser(newUserData)
        const jwt = await this.jwtService.signAsync({ email: result.email, uid: result._id });
        return {
            token: jwt
        }
    }

    @Get('user')
    async getUserProfile(@Req() req:Request) {
        const userId = req['userId']
        const result = await this.authService.getUserProfile(userId)
        return result
    }

    @Patch('user')
    async updateUserProfile(@Body() userDetails:any, @Req() req:Request) {
         const userId = req['userId']
        const result = await this.authService.updateUserProfile(userId, userDetails)
        return result
    }
}
