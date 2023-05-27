import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];
  async getAllTask() {
    return this.tasks;
  }
}
