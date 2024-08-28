import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    try {
      const article = await this.prisma.article.create({
        data: {
          ...createArticleDto,
        },
      })

      return article
    } catch (error) {
      throw error
    }
  }

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize
    const articles = await this.prisma.article.findMany({
      skip: skip,
      take: pageSize,
    })
    const totalItem = await this.prisma.article.count()
    const lastPage = Math.ceil(totalItem / pageSize)

    return {
      data: articles,
      page,
      pageSize,
      totalItem,
      lastPage,
    }
  }

  async findOne(id: number) {
    try {
      const article = await this.prisma.article.findUnique({
        where: {
          id,
        },
      })

      return article
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const article = await this.prisma.article.update({
        where: {
          id,
        },
        data: {
          ...updateArticleDto,
        },
      })

      return article
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.article.delete({
        where: {
          id,
        },
      })

      return id
    } catch (error) {
      throw error
    }
  }
}
