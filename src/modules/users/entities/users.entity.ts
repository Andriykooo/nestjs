import { Exclude } from 'class-transformer';
import { GameComment } from 'src/modules/game-comments/entities/game-comment.entity';
import { Game } from 'src/modules/games/entities/game.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from '../enum/gender.enum';
import { defaultDaysToDeath } from 'src/shared/constants/defaultDaysToDeath';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @ManyToMany(() => Game, (game) => game.users, { cascade: true })
  @JoinTable()
  games: Game[];

  @OneToMany(() => GameComment, (gameComment) => gameComment.user)
  gameComments: GameComment[];

  @Column({ type: 'varchar' })
  picture: string;

  @Column({ type: 'int', default: defaultDaysToDeath })
  daysToDeath: number;
}
