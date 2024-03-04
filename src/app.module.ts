import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/users.entity';
import { AuthModule } from './modules/auth/auth.module';
import { GamesModule } from './modules/games/games.module';
import { Game } from './modules/games/entities/game.entity';
import { GameCommentsModule } from './modules/game-comments/game-comments.module';
import { GameComment } from './modules/game-comments/entities/game-comment.entity';

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
