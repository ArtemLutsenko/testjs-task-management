import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TaskInterface, TaskStatus } from "./task.interface";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "../dto/createTask.dto";
import { GetFilterDto } from "../dto/getFilter.dto";
import { filter } from "rxjs";

@Injectable()
export class TasksService {

  private tasks: TaskInterface[] = [
    {
      id: "3042b711-ba6f-4a7f-a79f-a0bdf3cb3a96",
      title: "go to sleep",
      description: "go to sleep now",
      status: TaskStatus.OPEN
    }
  ];

  getAllTask(): TaskInterface[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): TaskInterface {
    const { title, description } = createTaskDto;
    const task: TaskInterface = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }

  getTasksWithFilters(filterDto: GetFilterDto): TaskInterface[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTask();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search)
      );
    }

    return tasks;
  }

  getSingleTask(id: string): TaskInterface {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.tasks.find(task => task.id === id);
    task.status = status;
    return task;
  }

  deleteTask(id: string) {
    const found = this.getSingleTask(id);
    this.tasks =this.tasks.filter(task => task.id !== found.id);
  }
}
