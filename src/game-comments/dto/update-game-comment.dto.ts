import { PartialType } from '@nestjs/swagger';
import { CreateGameCommentDto } from './create-game-comment.dto';

export class UpdateGameCommentDto extends PartialType(CreateGameCommentDto) {}
