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
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@ApiTags('Article')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
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
    return this.articleService.findAll(
      page ? Number(page) : 1,
      pageSize ? Number(pageSize) : PAGE_SIZE,
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }
}
