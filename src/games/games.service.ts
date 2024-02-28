import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}
  async create(createGameDto: CreateGameDto) {
    const game: Game = new Game();
    game.name = createGameDto.name;

    return await this.gameRepository.save(game);
  }

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: {
        id,
      },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    await this.findOne(id);

    const game: Game = new Game();
    game.name = updateGameDto.name;

    return await this.gameRepository.save(game);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.gameRepository.delete(id);
  }
}
