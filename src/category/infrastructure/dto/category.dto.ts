import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @ApiProperty({ type: String })
  readonly _id!: string;
  @IsString()
  @ApiProperty({ type: String })
  readonly title!: string;
}
