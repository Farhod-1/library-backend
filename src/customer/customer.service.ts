import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomersFilterDto } from './dto/get-customers-filter.dto';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersRepository } from './customer.repository';

@Injectable()
export class CustomerService {
    
    constructor(
        @InjectRepository(CustomersRepository)
        private customersRepository: CustomersRepository,
    ){}

    async getCustomer(filterDto: GetCustomersFilterDto): Promise<Customer[]> {
        return this.customersRepository.getCustomers(filterDto);
    }
    async GetCustomerById(id: string): Promise<Customer> {
        const found = await this.customersRepository.findOne({ where: { id } });

        if (!found) {
            throw new NotFoundException(`Customer with ID "${id}" not found`);
        }

        return found;
    }
    async CreateCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customersRepository.createCustomer(createCustomerDto);
    }
    async DeleteCustomer(id: string): Promise<void> {
        const result = await this.customersRepository.delete({ id});

        if (result.affected === 0) {
            throw new NotFoundException(`Customer with ID "${id}" not found`);
        }
    }
    

}   








// import { Injectable } from '@nestjs/common';
// import { v4 as uuid } from 'uuid';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// @Injectable()
// export class CustomerService { 
//     private tasks: Task[] = [];

//     getAllTasks(): Task[] {
//         return this.tasks;
//     }

//     getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//         const { status, search } = filterDto;

//         let tasks = this.getAllTasks();

//         // do something with status
//         if (status) {
//             tasks = tasks.filter((task) => task.status === status);
//         }

//         if (search) {
//             tasks = tasks.filter((task) => {
//                 if (task.title.includes(search) || task.description.includes(search)) {
//                     return true;
//                 }

//                 return false;
//             });
//         }

//         return tasks;
//     }

//     getTaskById(id: string): Task {
//         return this.tasks.find((task) => task.id === id);
//     }

//     createTask(createTaskDto: CreateTaskDto): Task {
//         const { title, description } = createTaskDto;

//         const task: Task = {
//             id: uuid(),
//             title,
//             description,
//             status: TaskStatus.OPEN,
//         };

//         this.tasks.push(task);
//         return task;
//     }

//     deleteTask(id: string): void {
//         this.tasks = this.tasks.filter((task) => task.id !== id);
//     }

//     updateTaskStatus(id: string, status: TaskStatus) {
//         const task = this.getTaskById(id);
//         task.status = status;
//         return task;
//     }
// }