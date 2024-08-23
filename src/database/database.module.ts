import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { FakerModule } from 'src/faker/faker.module';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  imports: [FakerModule],
})
export class DatabaseModule {}
