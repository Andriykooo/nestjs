import { Exclude } from 'class-transformer';
import { GameComment } from 'src/game-comments/entities/game-comment.entity';
import { Game } from 'src/games/entities/game.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'varchar' })
  picture: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   */
  gender: string;

  @ManyToMany(() => Game, (game) => game.users, { cascade: true })
  @JoinTable()
  games: Game[];

  @OneToMany(() => GameComment, (gameComment) => gameComment.user)
  gameComments: GameComment[];
}
