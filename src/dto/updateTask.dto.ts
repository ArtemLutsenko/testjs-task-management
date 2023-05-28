import { TaskStatus } from "../tasks/task.interface";
import { IS_ENUM, IsEnum } from "class-validator";

export class UpdateTaskDto{
  @IsEnum(TaskStatus)
  readonly status: TaskStatus
}
