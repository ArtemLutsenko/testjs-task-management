import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "../dto/createTask.dto";
import { GetFilterDto } from "../dto/getFilter.dto";
import { TaskEntity } from "./task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { TaskStatusEnum } from "./taskStatus.enum";
import { UserEntity } from "../auth/user.entity";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>, private dataSource: DataSource) {
  }


  async getTasks(user: UserEntity, filterDto: GetFilterDto): Promise<TaskEntity[]>{
    const {search, status} = filterDto
    const queryBuilder = this.dataSource.getRepository(TaskEntity).createQueryBuilder("Tasks")

    queryBuilder.where({user})

    if(search){
      queryBuilder.andWhere("Tasks.title Like :search OR Tasks.description Like :search", {search: `%${search}%`})
    }
    if(status){
      queryBuilder.andWhere("Tasks.status = :status", {status})
    }

    return await queryBuilder.getMany()
  }

  async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {

    const task = new TaskEntity()
    Object.assign(task, createTaskDto)

    task.user = user

    return await this.taskRepository.save(task);
  }

  async getTaskById(user: UserEntity, id: string): Promise<TaskEntity>{
    const task = await this.taskRepository.findOne({ where: { id, user: { id: user.id } } });
    if(!task){
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND);
    }
    return task
  }

  async updateTaskStatus( user: UserEntity, id: string, status: TaskStatusEnum): Promise<TaskEntity>{
    const task = await this.taskRepository.findOne({ where: { id, user: { id: user.id } } });
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async deleteTask(user: UserEntity, id: string) {
    const found = await this.getTaskById(user, id);
    if(!found){
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND)
    }
    return await  this.taskRepository.remove(found)
    return true
  }
}
