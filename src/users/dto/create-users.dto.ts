import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class CreateUsersDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  @ApiProperty()
  email: string;

  @IsInt()
  @ApiProperty()
  age: number;

  @IsString()
  @ApiProperty()
  gender: string;

  picture: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain
      Minimum eight characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and one special character
    `,
  })
  @ApiProperty()
  password: string;
}
