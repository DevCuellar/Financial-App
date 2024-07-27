import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
  @Get()
  async testGuard() {
    return { data: 'Nice! you have a valid token!' };
  }
}
