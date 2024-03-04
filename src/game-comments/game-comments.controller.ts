import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { GameCommentsService } from './game-comments.service';
import { CreateGameCommentDto } from './dto/create-game-comment.dto';

@Controller('game-comments')
export class GameCommentsController {
  constructor(private readonly gameCommentsService: GameCommentsService) {}
}
