import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { GetUser } from 'src/auth/decorator'
import { JwtGuard } from 'src/auth/guard'

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user
  }
}
