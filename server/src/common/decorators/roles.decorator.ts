import { SetMetadata } from '@nestjs/common';

// This matches the 'roles' key used in your RolesGuard
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);