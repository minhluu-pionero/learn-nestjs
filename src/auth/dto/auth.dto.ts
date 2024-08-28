import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  @ApiProperty({ default: 'test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string
}
