import { TaskStatusEnum } from "../tasks/taskStatus.enum";
import { IS_ENUM, IsEnum } from "class-validator";

export class UpdateTaskDto{
  @IsEnum(TaskStatusEnum)
  readonly status: TaskStatusEnum
}
