import { Module } from '@nestjs/common';
import { GameCommentsService } from './game-comments.service';
import { GameCommentsController } from './game-comments.controller';

@Module({
  controllers: [GameCommentsController],
  providers: [GameCommentsService],
  exports: [GameCommentsService],
})
export class GameCommentsModule {}
