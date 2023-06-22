import { EntityRepository, Repository } from "typeorm";
import { Customer } from "./customer.entity";
import {  CreateCustomerDto } from "./dto/create-customer.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { GetCustomersFilterDto } from "./dto/get-customers-filter.dto";
@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer>{
    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const { username, password,phonenumber } = createCustomerDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('salt:', salt);
        console.log(hashedPassword);



        const customer = this.create({ username, password: hashedPassword , phonenumber});
        try {
            await this.save(customer);
            return customer;
        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            }
            else {
                throw new InternalServerErrorException('Something went wrong');
            }


        }
    }
    async getCustomers(filterDto: GetCustomersFilterDto): Promise<Customer[]> {
        const {  search } = filterDto;
        const query = this.createQueryBuilder('book');

     
        if (search) {
            query.andWhere(
                '(LOWER(book.name) LIKE LOWER(:search) OR LOWER(book.author) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }
        try {
            const customers = await query.getMany();
            return customers;
        }
        catch (error) {

            throw new InternalServerErrorException();
        }
    }
   
}