import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FakerService } from '../faker/faker.service';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor(private fakerService: FakerService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();

    // Check if the database is empty
    const count = await this.customer.count();
    if (count > 0) {
      console.log('Database is not empty, skipping seeding');
      return;
    }

    // Create fake customers and insert them into the database
    const fakeCustomers = this.fakerService.createFakeCustomers(10);
    await this.customer.createMany({
      data: fakeCustomers,
    });
  }
}
