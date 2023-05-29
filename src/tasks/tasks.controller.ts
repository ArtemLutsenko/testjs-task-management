import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatusEnum } from "./taskStatus.enum";
import { CreateTaskDto } from "../dto/createTask.dto";
import { GetFilterDto } from "../dto/getFilter.dto";
import { UpdateTaskDto } from "../dto/updateTask.dto";
import { TaskEntity } from "./task.entity";
import { DataSource } from "typeorm";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get()
  getTasks(@Query()filterDto: GetFilterDto): Promise<TaskEntity[]> {
      return this.tasksService.getTasks(filterDto);
  }

  @Post()
  createTask(@Body()createTaskDTO: CreateTaskDto): Promise<TaskEntity> {
    return  this.tasksService.createTask(createTaskDTO);
  }

  @Get(':id')
  getTask(@Param('id') taskId: string): Promise<TaskEntity> {
    return this.tasksService.getTaskById(taskId);
  }

  @Patch(':id/status')
  updateTask(@Param('id') taskId: string, @Body() updateTaskStatusDto: UpdateTaskDto):  Promise<TaskEntity> {

    const {status} = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(taskId, status);
  }
  //
  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}
