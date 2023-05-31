import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatusEnum } from "./taskStatus.enum";
import { CreateTaskDto } from "../dto/createTask.dto";
import { GetFilterDto } from "../dto/getFilter.dto";
import { UpdateTaskDto } from "../dto/updateTask.dto";
import { TaskEntity } from "./task.entity";
import { DataSource } from "typeorm";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/decorators/user.decorator";
import { UserEntity } from "../auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get()
  getTasks(@User() user: UserEntity, @Query()filterDto: GetFilterDto): Promise<TaskEntity[]> {
      return this.tasksService.getTasks(user, filterDto);
  }

  @Post()
  createTask(@Body()createTaskDTO: CreateTaskDto, @User()user: UserEntity): Promise<TaskEntity> {
    return  this.tasksService.createTask(createTaskDTO, user);
  }

  @Get(':id')
  getTask(@User() user: UserEntity,@Param('id') taskId: string): Promise<TaskEntity> {
    return this.tasksService.getTaskById(user, taskId);
  }

  @Patch(':id/status')
  updateTask(@User() user: UserEntity, @Param('id') taskId: string, @Body() updateTaskStatusDto: UpdateTaskDto):  Promise<TaskEntity> {

    const {status} = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(user, taskId, status);
  }
  //
  @Delete(':id')
  async deleteTask(@User() user: UserEntity, @Param('id') taskId: string) {
    return this.tasksService.deleteTask(user, taskId);
  }
}
