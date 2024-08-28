import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateArticleCategoryDto {
  @ApiProperty({ default: 'Category name' })
  @IsNotEmpty()
  @IsString()
  name: string
}
