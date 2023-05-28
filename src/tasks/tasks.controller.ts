import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskInterface, TaskStatus } from "./task.interface";
import { CreateTaskDto } from "../dto/createTask.dto";
import { GetFilterDto } from "../dto/getFilter.dto";
import { UpdateTaskDto } from "../dto/updateTask.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get()
  getTasks(@Query()filterDto: GetFilterDto): TaskInterface[] {
    if(Object.keys(filterDto).length){
      return this.tasksService.getTasksWithFilters(filterDto)
    } else{
      return this.tasksService.getAllTask();
    }
  }

  @Post()
  createTask(@Body()createTaskDTO: CreateTaskDto): TaskInterface {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Get(':id')
  getTask(@Param('id') taskId: string): TaskInterface {
    console.log(taskId);
    return this.tasksService.getSingleTask(taskId);
  }

  @Patch(':id/status')
  updateTask(@Param('id') taskId: string, @Body() updateTaskStatusDto: UpdateTaskDto): TaskInterface {

    const {status} = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(taskId, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    this.tasksService.deleteTask(taskId);
  }
}
