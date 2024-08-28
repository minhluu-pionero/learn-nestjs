import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'

import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/guard'
import { PAGE_SIZE } from 'src/utils/constant'
import { ArticleCategoryService } from './article-category.service'
import { CreateArticleCategoryDto } from './dto/create-article-category.dto'
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto'

@ApiTags('Article category')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('article-categories')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  @Post()
  create(@Body() createArticleCategoryDto: CreateArticleCategoryDto) {
    return this.articleCategoryService.create(createArticleCategoryDto)
  }

  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @Get()
  findAll(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return this.articleCategoryService.findAll(
      page ? Number(page) : 1,
      pageSize ? Number(pageSize) : PAGE_SIZE,
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleCategoryService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    return this.articleCategoryService.update(+id, updateArticleCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleCategoryService.remove(+id)
  }
}
