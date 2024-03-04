import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { Game } from './games/entities/game.entity';
import { GameCommentsModule } from './game-comments/game-comments.module';
import { GameComment } from './game-comments/entities/game-comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [User, Game, GameComment],
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    GamesModule,
    GameCommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
