import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService:JwtService, private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //To exclude login routes from global auth
    const isPublic = this.reflector.get<boolean>( "isPublic", context.getHandler() );
		if ( isPublic ) {
			return true;
		}
    
    //Auth logic
    const request = context.switchToHttp().getRequest() as Request
    const token = request.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new HttpException('Unauthorized access! No access token found', HttpStatus.UNAUTHORIZED)
    }
    try {
      const isVerified = this.jwtService.verify(token, { secret: 'priyanshubhardwaj' })
      request['userId'] = isVerified['uid']
      return true
    } catch (error) {
      throw new HttpException('Unauthorized access!, Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}
 