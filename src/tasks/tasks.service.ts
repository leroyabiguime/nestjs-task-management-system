import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
   constructor(
       @InjectRepository(TaskRepository)
       private taskRepository: Repository<Task>
   ) {}



   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
       const task = new Task();
       task.title = createTaskDto.title;
       task.description = task.description;
       task.status = TaskStatus.OPEN;
       await task.save();
       return task;
   }


   async getTaskById(id: number): Promise<Task>{
    const found = await this.taskRepository.findOne(id)
       if(!found) {
           throw new NotFoundException(`Task with ID ${id} not found`);
       }
       return found;
   }

   async updateTaskStatus(id: number, status: TaskStatus) {
       const task = await this.getTaskById(id);
       task.status = status;
       await task.save()
       return task;
   }
   async deleteTask(id: number): Promise<void>{
    const del = await this.taskRepository.delete(id);

    if(del.affected === 0){
        throw new NotFoundException(`Task with ID ${id} not found`);
    }
   }

}
 