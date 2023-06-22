import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersRepository } from './customer.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CustomersRepository])
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
