import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { GamesModule } from 'src/games/games.module';
import { GameCommentsService } from 'src/game-comments/game-comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GamesModule, GameCommentsService],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
