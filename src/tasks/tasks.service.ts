import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "../dto/createTask.dto";
import { GetFilterDto } from "../dto/getFilter.dto";
import { TaskEntity } from "./task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { TaskStatusEnum } from "./taskStatus.enum";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>, private dataSource: DataSource) {
  }


  async getTasks(filterDto: GetFilterDto): Promise<TaskEntity[]>{
    const {search, status} = filterDto
    const queryBuilder = this.dataSource.getRepository(TaskEntity).createQueryBuilder("Tasks")

    if(search){
      queryBuilder.andWhere("Tasks.title Like :search OR Tasks.description Like :search", {search: `%${search}%`})
    }
    if(status){
      queryBuilder.andWhere("Tasks.status = :status", {status})
    }

    return await queryBuilder.getMany()
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {

    const task = new TaskEntity()
    Object.assign(task, createTaskDto)

    return await this.taskRepository.save(task);
  }

  async getTaskById(id: string): Promise<TaskEntity>{
    const task = await this.taskRepository.findOne({where:{id}})
    if(!task){
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND);
    }
    return task
  }

  async updateTaskStatus(id: string, status: TaskStatusEnum): Promise<TaskEntity>{
    const task = await this.taskRepository.findOne({where:{id}})
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: string) {
    const found = await this.getTaskById(id);
    if(!found){
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND)
    }
    return await  this.taskRepository.delete(found)
  }
}
