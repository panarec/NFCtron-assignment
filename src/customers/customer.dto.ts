import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CustomerDto {
  @IsString()
  @ApiProperty({
    example: 'Alice',
    description: 'The name of the customer',
  })
  name: string;
}
