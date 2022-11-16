import { SetMetadata } from '@nestjs/common';
import { META_ROLES, UserRolesEnum } from '../interfaces/user-roles.interface';

export const RoleProtected = (...args: UserRolesEnum[]) => {
  return SetMetadata(META_ROLES, args);
};
