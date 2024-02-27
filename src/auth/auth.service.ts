import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/users.entity';
import { JwtResponse } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Users> {
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

  async signIn(user: Users): Promise<JwtResponse> {
    const payload = { id: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
