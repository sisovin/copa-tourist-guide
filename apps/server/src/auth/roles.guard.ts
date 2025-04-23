import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      const authHeader = request.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
          const decodedToken = this.jwtService.verify(token);
          request.user = decodedToken;
        } catch (error) {
          return false;
        }
      } else {
        return false;
      }
    }

    return requiredRoles.some((role) => request.user.role?.includes(role));
  }
}
