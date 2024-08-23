import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CustomerDto } from './customer.dto';
@Injectable()
export class CustomersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createCustomer(customer: CustomerDto) {
    const { name } = customer;
    try {
      return this.databaseService.customer.create({
        data: {
          name: name,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCustomers() {
    try {
      return this.databaseService.customer.findMany();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCustomerById(id: string) {
    try {
      return this.databaseService.customer.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCustomer(id: string, customer: CustomerDto) {
    const { name } = customer;
    try {
      return this.databaseService.customer.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
