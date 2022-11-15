import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MaxLength(250)
  short_description: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  is_published?: boolean;
}
