import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString } from 'class-validator';

export class PaginationOptionsDto {
  @IsString()
  @ApiProperty()
  page: string;

  @IsString()
  @ApiProperty()
  limit: string;
}

export class PaginationDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  data: T[];

  @IsInt()
  @ApiProperty()
  page: number;

  @IsInt()
  @ApiProperty()
  limit: number;

  @IsInt()
  @ApiProperty()
  totalCount: number;

  constructor(data: T[], totalCount: number, page: number, limit: number) {
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.totalCount = totalCount;
  }
}
