import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GamesService } from 'src/modules/games/games.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private gamesSrvice: GamesService,
  ) {}

  async create(createUserDto: CreateUsersDto): Promise<User> {
    const isUserExist = await this.findOneByEmail(createUserDto.email);

    if (isUserExist) {
      throw new BadRequestException('User with this email already exist');
    }

    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user: User = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.gender = createUserDto.gender;
    user.picture = '';
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        games: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUsersDto): Promise<User> {
    const user = await this.findOne(id);

    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.gender = updateUserDto.gender;

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

  async addGame(userId: number, gameId: number) {
    const user = await this.findOne(userId);
    const game = await this.gamesSrvice.findOne(gameId);

    user.games.push(game);

    await this.userRepository.save(user);
  }

  async removeGame(userId: number, gameId: number) {
    const user = await this.findOne(userId);

    user.games = user.games.filter((game) => game.id !== gameId);

    await this.userRepository.save(user);
  }
}
