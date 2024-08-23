import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class FakerService {
  createFakeCustomer() {
    return {
      name: faker.person.firstName(),
    };
  }

  createFakeCustomers(count: number) {
    return faker.helpers.multiple(this.createFakeCustomer, { count });
  }
}
