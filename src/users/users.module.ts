import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { GamesModule } from 'src/games/games.module';
import { GameCommentsModule } from 'src/game-comments/game-comments.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GamesModule, GameCommentsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
