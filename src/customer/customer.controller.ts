import { AuthGuard } from '@nestjs/passport';
import { CustomerService } from './customer.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Customer } from './customer.entity';
import { GetCustomersFilterDto } from './dto/get-customers-filter.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';


@Controller('customers')
@UseGuards(AuthGuard())
export class CustomerController {
    
    constructor(private customerService: CustomerService) { }

    @Get()
    getCustomer(
        @Query() filterDto: GetCustomersFilterDto,
    ): Promise<Customer[]> {
    
        return this.customerService.getCustomer(filterDto);
    }
    @Get('/:id')
    GetCustomerById(@Param('id') id: string): Promise<Customer> {
        return this.customerService.GetCustomerById(id);
    }
    @Post('add')
    CreateCustomer(
        @Body() createCustomerDto: CreateCustomerDto,
    ): Promise<Customer> {
        return this.customerService.CreateCustomer(createCustomerDto);
    }
    @Delete('/:id')
    DeleteCustomer(@Param('id') id: string): Promise<void> {

        return this.customerService.DeleteCustomer(id);
    }
    

}
