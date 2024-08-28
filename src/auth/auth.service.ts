import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import * as argon from 'argon2'

import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    const password = await argon.hash(dto.password)
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
        },
        select: {
          id: true,
          email: true,
        },
      })
      return this.signToken(user.id, user.email)
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Credentials error')
      }

      throw error
    }
  }

  async signIn(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (!user) throw new ForbiddenException('Credentials incorrect')

    const passwordMatched = await argon.verify(user.password, dto.password)

    if (!passwordMatched) throw new ForbiddenException('Credentials incorrect')

    return this.signToken(user.id, user.email)
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    }

    const expiresIn = await this.configService.get('JWT_EXPIRES_IN')
    const secret = await this.configService.get('JWT_SECRET')
    const accept_token = await this.jwt.signAsync(payload, {
      expiresIn,
      secret,
    })

    return { accept_token }
  }
}
