import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ArticleCategoryModule } from './article-category/article-category.module'
import { AuthModule } from './auth/auth.module'
import { BookmarkModule } from './bookmark/bookmark.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    ArticleCategoryModule,
    ArticleModule,
  ],
})
export class AppModule {}
