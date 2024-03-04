import { OmitType } from '@nestjs/swagger';
import { CreateUsersDto } from './create-users.dto';

export class UpdateUsersDto extends OmitType(CreateUsersDto, [
  'email',
  'password',
]) {}
