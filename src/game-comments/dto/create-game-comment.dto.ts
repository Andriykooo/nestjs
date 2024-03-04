import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;
}
