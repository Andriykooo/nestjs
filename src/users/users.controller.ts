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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtRequest } from 'src/auth/auth.type';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('get-all-users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('get-user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Request() req: JwtRequest) {
    return this.userService.findOne(+req.user.id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  update(@Request() req: JwtRequest, @Body() updateUserDto: UpdateUsersDto) {
    return this.userService.update(+req.user.id, updateUserDto);
  }

  @Delete('delete')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  remove(@Request() req: JwtRequest) {
    return this.userService.remove(+req.user.id);
  }

  @Post('picture')
  @UseGuards(JwtAuthGuard)
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
}
