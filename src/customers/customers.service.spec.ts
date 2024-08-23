import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CustomerDto } from '../customers/customer.dto';
import { CustomersService } from './customers.service';

describe('DataService', () => {
  let customersService: CustomersService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: DatabaseService,
          useValue: {
            customer: {
              create: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    customersService = module.get<CustomersService>(CustomersService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCustomer', () => {
    it('should create a new customer', async () => {
      const customer: CustomerDto = { name: 'John Doe' };
      const expectedResult = {
        id: '1',
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(databaseService.customer, 'create')
        .mockResolvedValue(expectedResult);

      const result = await customersService.createCustomer(customer);

      expect(result).toEqual(expectedResult);
      expect(databaseService.customer.create).toHaveBeenCalledWith({
        data: {
          name: customer.name,
        },
      });
    });

    it('should throw an internal server error if an error occurs', async () => {
      const customer: CustomerDto = { name: 'John Doe' };

      jest
        .spyOn(databaseService.customer, 'create')
        .mockRejectedValue(new HttpException('Internal server error', 500));

      await expect(customersService.createCustomer(customer)).rejects.toThrow(
        HttpException,
      );
      expect(databaseService.customer.create).toHaveBeenCalledWith({
        data: {
          name: customer.name,
        },
      });
    });
  });

  describe('getCustomers', () => {
    it('should return all customers', async () => {
      const expectedResult = [
        {
          id: '1',
          name: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(databaseService.customer, 'findMany')
        .mockResolvedValue(expectedResult);

      const result = await customersService.getCustomers();

      expect(result).toEqual(expectedResult);
      expect(databaseService.customer.findMany).toHaveBeenCalled();
    });

    it('should throw an internal server error if an error occurs', async () => {
      jest
        .spyOn(databaseService.customer, 'findMany')
        .mockRejectedValue(new HttpException('Internal server error', 500));

      await expect(customersService.getCustomers()).rejects.toThrow(
        HttpException,
      );
      expect(databaseService.customer.findMany).toHaveBeenCalled();
    });
  });

  describe('getCustomerById', () => {
    it('should return the customer with the specified id', async () => {
      const id = '1';
      const expectedResult = {
        id: '1',
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(databaseService.customer, 'findUnique')
        .mockResolvedValue(expectedResult);

      const result = await customersService.getCustomerById(id);

      expect(result).toEqual(expectedResult);
      expect(databaseService.customer.findUnique).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
    });

    it('should throw an internal server error if an error occurs', async () => {
      const id = '1';

      jest
        .spyOn(databaseService.customer, 'findUnique')
        .mockRejectedValue(new HttpException('Internal server error', 500));

      await expect(customersService.getCustomerById(id)).rejects.toThrowError(
        HttpException,
      );
      expect(databaseService.customer.findUnique).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
    });
  });

  describe('updateCustomer', () => {
    it('should update the customer with the specified id', async () => {
      const id = '1';
      const customer: CustomerDto = { name: 'John Doe' };
      const expectedResult = {
        id: '1',
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(databaseService.customer, 'update')
        .mockResolvedValue(expectedResult);

      const result = await customersService.updateCustomer(id, customer);

      expect(result).toEqual(expectedResult);
      expect(databaseService.customer.update).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: {
          name: customer.name,
        },
      });
    });

    it('should throw an internal server error if an error occurs', async () => {
      const id = '1';
      const customer: CustomerDto = { name: 'John Doe' };

      jest
        .spyOn(databaseService.customer, 'update')
        .mockRejectedValue(new HttpException('Internal server error', 500));

      await expect(
        customersService.updateCustomer(id, customer),
      ).rejects.toThrow(HttpException);
      expect(databaseService.customer.update).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: {
          name: customer.name,
        },
      });
    });
  });
});
