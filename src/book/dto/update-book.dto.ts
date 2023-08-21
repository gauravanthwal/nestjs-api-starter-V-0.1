import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../schemas/book.schema';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly author: string;

  @IsNumber()
  @IsOptional()
  readonly price: number;

  @IsEnum(Category, { message: 'Please enter correct category' })
  @IsOptional()
  readonly category: Category;
}
