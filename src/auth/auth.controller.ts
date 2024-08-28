import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto)
  }

  @Post('sign-up')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto)
  }
}
