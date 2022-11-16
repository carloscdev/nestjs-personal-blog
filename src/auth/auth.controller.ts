import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { User } from './entities/auth.entity';
import { UserRolesEnum } from './interfaces/user-roles.interface';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  testAuth(@GetUser() user: User) {
    return user;
  }

  @Get('test/roles')
  @Auth(UserRolesEnum.ADMIN)
  testAuthRoles(@GetUser() user: User) {
    return user;
  }
}
