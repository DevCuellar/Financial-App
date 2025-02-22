import { Module } from '@nestjs/common';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [BudgetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
