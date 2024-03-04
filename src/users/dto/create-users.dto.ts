import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '../enum/gender.enum';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class CreateUsersDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @MaxLength(40, {
    message: 'Name is too long, must be less than 40 characters.',
  })
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

  @IsEnum(Gender)
  @ApiProperty()
  gender: string;

  picture: Express.Multer.File;

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
