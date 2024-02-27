import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUsersDto): Promise<Users> {
    const isUserExist = await this.findOneByEmail(createUserDto.email);

    if (isUserExist) {
      throw new BadRequestException('User with this email already exist');
    }

    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user: Users = new Users();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = hashedPassword;
    user.picture = createUserDto.picture;
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUsersDto): Promise<Users> {
    await this.findOne(id);

    const user: Users = new Users();

    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = id;
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }

  async uploadPicture(id: number, file: Express.Multer.File) {
    const user = await this.findOne(id);

    user.picture = process.env.APP_URL + '/' + file.path;

    return await this.userRepository.save(user);
  }
}
