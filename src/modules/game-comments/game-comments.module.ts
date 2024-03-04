import { Module } from '@nestjs/common';
import { GameCommentsService } from './game-comments.service';
import { GameCommentsController } from './game-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameComment } from './entities/game-comment.entity';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameComment]), GamesModule, UsersModule],
  controllers: [GameCommentsController],
  providers: [GameCommentsService],
  exports: [GameCommentsService],
})
export class GameCommentsModule {}
