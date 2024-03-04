import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { GameCommentsService } from './game-comments.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptionsDto } from 'src/shared/dto/pagination.dto';

@ApiTags('game-comments')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('game-comments')
export class GameCommentsController {
  constructor(private readonly gameCommentsService: GameCommentsService) {}

  @Get('get-game-comments/:gameId')
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('gameId') gameId: string,
    @Query() paginationOptions: PaginationOptionsDto,
  ) {
    return this.gameCommentsService.findAll(+gameId, paginationOptions);
  }
}
