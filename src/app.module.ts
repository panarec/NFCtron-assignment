import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataModule } from './data/data.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FakerModule } from './faker/faker.module';
@Module({
  imports: [
    DataModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    FakerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
