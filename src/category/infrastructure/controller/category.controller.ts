import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoryDto } from '../dto/category.dto';
import { CategoryService } from '../service/category.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get categories' })
  @ApiResponse({ status: 200, description: 'Get categories' })
  @Get()
  async getCategories(@Request() req): Promise<any[]> {
    return this.categoryService.getCategories();
  }

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 204, description: 'Create category' })
  @HttpCode(204)
  @Post()
  async createCategory(
    @Body() categoryDto: CategoryDto,
    @Request() req,
  ): Promise<void> {
    await this.categoryService.createCategory(
      categoryDto._id,
      categoryDto.title,
    );
  }
}
