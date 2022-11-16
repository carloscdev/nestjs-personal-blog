import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { handleValidationError } from 'src/common/mixins/handle-error.mixins';
import { User } from './entities/auth.entity';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.userModel.create({
        ...userData,
        email: userData.email.toLowerCase().trim(),
        password: await bcrypt.hashSync(password, 10),
      });
      user.password = null;
      return {
        user,
        token: this.getJwtToken({ id: String(user._id) }),
      };
    } catch (error) {
      handleValidationError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;
      const user = await this.userModel
        .findOne({ email: email.toLowerCase().trim() })
        .select('+password');
      if (!user) throw new UnauthorizedException('Credentials are not valid');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not valid');

      user.password = null;

      delete user.password;
      return {
        user,
        token: this.getJwtToken({ id: String(user._id) }),
      };
    } catch (error) {
      handleValidationError(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
