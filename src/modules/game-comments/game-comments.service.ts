import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameCommentDto } from './dto/create-game-comment.dto';
import { Repository } from 'typeorm';
import { GameComment } from './entities/game-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/users.entity';
import { Game } from 'src/modules/games/entities/game.entity';
import {
  PaginationDto,
  PaginationOptionsDto,
} from 'src/shared/dto/pagination.dto';
import { convertStringToNumber } from 'src/shared/utils/convertStringToNumber';

@Injectable()
export class GameCommentsService {
  constructor(
    @InjectRepository(GameComment)
    private readonly gameCommentsRepository: Repository<GameComment>,
  ) {}

  async create(
    user: User,
    game: Game,
    createGameCommentDto: CreateGameCommentDto,
  ) {
    const gameComment: GameComment = new GameComment();
    gameComment.comment = createGameCommentDto.comment;
    gameComment.user = user;
    gameComment.game = game;

    return await this.gameCommentsRepository.save(gameComment);
  }

  async findAll(
    gameId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginationDto<GameComment>> {
    const page = convertStringToNumber(paginationOptions.page) || 1;
    const limit = convertStringToNumber(paginationOptions.limit) || 10;

    const skip = (page - 1) * limit;

    const [data, totalCount] = await this.gameCommentsRepository.findAndCount({
      where: {
        game: { id: gameId },
      },
      relations: ['user'],
      skip,
      take: limit,
    });

    return new PaginationDto(data, totalCount, page, limit);
  }

  async remove(id: number, userId: number) {
    const comment = await this.gameCommentsRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (comment?.user?.id !== userId) {
      throw new NotFoundException('Comment not found');
    }

    await this.gameCommentsRepository.delete(id);
  }
}
