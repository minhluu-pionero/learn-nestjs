import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateArticleCategoryDto } from './dto/create-article-category.dto'
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto'

@Injectable()
export class ArticleCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleCategoryDto: CreateArticleCategoryDto) {
    try {
      const articleCategory = await this.prisma.articleCategory.create({
        data: {
          ...createArticleCategoryDto,
        },
      })

      return articleCategory
    } catch (error) {
      throw error
    }
  }

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize
    const articleCategories = await this.prisma.articleCategory.findMany({
      skip: skip,
      take: pageSize,
    })
    const totalItem = await this.prisma.articleCategory.count()
    const lastPage = Math.ceil(totalItem / pageSize)

    return {
      data: articleCategories,
      page,
      pageSize,
      totalItem,
      lastPage,
    }
  }

  async findOne(id: number) {
    try {
      const articleCategories = await this.prisma.articleCategory.findUnique({
        where: {
          id,
        },
      })

      return articleCategories
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateArticleCategoryDto: UpdateArticleCategoryDto) {
    try {
      const articleCategory = await this.prisma.articleCategory.update({
        where: {
          id,
        },
        data: {
          ...updateArticleCategoryDto,
        },
      })

      return articleCategory
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.articleCategory.delete({
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
