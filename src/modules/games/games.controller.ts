import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('game')
@Controller('game')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get('get-all-games')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('get-game/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Patch('update-game/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete('delete-game/:id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
