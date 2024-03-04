import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameCommentDto } from './dto/create-game-comment.dto';
import { Repository } from 'typeorm';
import { GameComment } from './entities/game-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Game } from 'src/games/entities/game.entity';

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
