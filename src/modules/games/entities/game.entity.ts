import { GameComment } from 'src/modules/game-comments/entities/game-comment.entity';
import { User } from 'src/modules/users/entities/users.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @ManyToMany(() => User, (user) => user.games)
  users: User[];

  @OneToMany(() => GameComment, (gameComment) => gameComment.game, {
    cascade: true,
  })
  gameComments: GameComment[];
}
