import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    // If no roles are defined on the route, let them through
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    
    // Check if the user exists and has the required role from the Supabase payload
    return requiredRoles.some((role) => user?.role === role);
  }
}