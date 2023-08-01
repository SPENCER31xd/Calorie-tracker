import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) { }
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const permittedRoles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest()
    const response = await this.authService.getUserProfile(request['userId'])
    let hasAccess = false
    permittedRoles.map(item => {
        if (response.roles.includes(item)) {
          hasAccess = true
          return
        }
      })
    if (!hasAccess) {
      throw new HttpException("You are not permitted to access this resource", HttpStatus.FORBIDDEN)
    } 
    return true;
  }
}
