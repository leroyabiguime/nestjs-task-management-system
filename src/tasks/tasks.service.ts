import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
   constructor(
       @InjectRepository(TaskRepository)
       private taskRepository: Repository<TaskRepository>
   ) {}

}
 