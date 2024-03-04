import { Game } from 'src/modules/games/entities/game.entity';
import { User } from 'src/modules/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  comment: string;

  @ManyToOne(() => User, (user) => user.gameComments)
  user: User;

  @ManyToOne(() => Game, (game) => game.gameComments)
  game: Game;
}
