import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GameCommentsService } from './game-comments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationOptionsDto } from 'src/shared/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtRequest } from '../auth/auth.type';
import { CreateGameCommentDto } from './dto/create-game-comment.dto';

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

  @Post('add-comment/:gameId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addComment(
    @Request() req: JwtRequest,
    @Param('gameId') gameId: string,
    @Body() createGameCommentDto: CreateGameCommentDto,
  ) {
    return this.gameCommentsService.addComment(
      +req.user.id,
      +gameId,
      createGameCommentDto,
    );
  }

  @Delete('remove-comment/:commentId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeComment(
    @Request() req: JwtRequest,
    @Param('commentId') commentId: string,
  ) {
    return this.gameCommentsService.removeComment(+req.user.id, +commentId);
  }
}
