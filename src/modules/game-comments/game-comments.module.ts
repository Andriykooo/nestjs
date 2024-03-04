import { Module } from '@nestjs/common';
import { GameCommentsService } from './game-comments.service';
import { GameCommentsController } from './game-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameComment } from './entities/game-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameComment])],
  controllers: [GameCommentsController],
  providers: [GameCommentsService],
  exports: [GameCommentsService],
})
export class GameCommentsModule {}
