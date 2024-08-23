import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerDto } from './customers/customer.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CustomersService } from './customers/customers.service';

@Controller('customers')
export class AppController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  async createCustomer(@Body() customer: CustomerDto) {
    return this.customersService.createCustomer(customer);
  }

  @ApiResponse({
    status: 200,
    description: 'The list of all customers.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async getCustomers() {
    return this.customersService.getCustomers();
  }

  @ApiResponse({
    status: 200,
    description: 'The customer with the specified ID.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    return this.customersService.getCustomerById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully updated.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put(':id')
  async updateCustomer(@Param('id') id: string, @Body() customer: CustomerDto) {
    return this.customersService.updateCustomer(id, customer);
  }
}
