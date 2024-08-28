import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateArticleDto {
  @ApiProperty({ default: 'Title' })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({ default: 'This is short description' })
  @IsString()
  shortDescription?: string

  @ApiProperty({ default: 'This is content' })
  @IsNotEmpty()
  @IsString()
  content: string

  @ApiProperty()
  thumbnail?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  categoryId: number
}
