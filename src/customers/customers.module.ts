import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomersService } from './customers.service';

@Module({
  providers: [CustomersService],
  imports: [DatabaseModule],
  exports: [CustomersService],
})
export class CustomersModule {}
