import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { UserRolesEnum } from 'src/auth/interfaces/user-roles.interface';
import * as bcrypt from 'bcrypt';

export const userData: CreateUserDto[] = [
  {
    name: 'Carlos',
    email: 'carlos_cdo@outlook.com',
    username: 'carloscdev',
    password: bcrypt.hashSync('Carloscdev123', 10),
    roles: [UserRolesEnum.ADMIN],
  },
  {
    name: 'Aldo',
    email: 'aldo@gmail.com',
    username: 'aldo',
    password: bcrypt.hashSync('Aldo123', 10),
    roles: [UserRolesEnum.USER],
  },
];
