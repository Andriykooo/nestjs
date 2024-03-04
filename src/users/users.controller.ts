import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtRequest } from 'src/auth/auth.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateGameCommentDto } from 'src/game-comments/dto/create-game-comment.dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('get-all-users')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get('get-user/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@Request() req: JwtRequest) {
    return this.userService.findOne(+req.user.id);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Request() req: JwtRequest, @Body() updateUserDto: UpdateUsersDto) {
    return this.userService.update(+req.user.id, updateUserDto);
  }

  @Delete('delete')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Request() req: JwtRequest) {
    return this.userService.remove(+req.user.id);
  }

  @Post('picture')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './media',
        filename: (_req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadPicture(
    @Request() req: JwtRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadPicture(+req.user.id, file);
  }

  @Post('add-game/:gameId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addGame(@Request() req: JwtRequest, @Param('gameId') gameId: string) {
    return this.userService.addGame(+req.user.id, +gameId);
  }

  @Patch('remove-game/:gameId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeGame(@Request() req: JwtRequest, @Param('gameId') gameId: string) {
    return this.userService.removeGame(+req.user.id, +gameId);
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
    return this.userService.addComment(
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
    return this.userService.removeComment(+req.user.id, +commentId);
  }
}
