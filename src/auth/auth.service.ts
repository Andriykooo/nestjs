import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/users.entity';
import { JwtResponse } from './auth.type';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException("User with this email don't exist");
    }

    const isPasswordMatch = await bcrypt.compare(pass, user?.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Incorrect password');
    }

    return user;
  }

  async logIn(user: User): Promise<{ user: User } & JwtResponse> {
    const payload = { id: user.id, email: user.email };

    return {
      user,
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '5m',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async register(
    createUserDto: CreateUsersDto,
  ): Promise<{ user: User } & JwtResponse> {
    const newUser = await this.usersService.create(createUserDto);

    return this.logIn(newUser);
  }

  async refreshToken(user: User): Promise<Omit<JwtResponse, 'refresh_token'>> {
    const payload = { id: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '5m',
      }),
    };
  }
}
