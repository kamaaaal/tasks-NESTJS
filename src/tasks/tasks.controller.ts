import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  RequestTimeoutException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskFilterDto } from './dto/getTasksFilter.dto';
import { UpdateTaskDto } from './dto/updateStatus.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // we just pass the serice class to the controller's contructor with visibility(public,private)
  // then type script automatiically instanciates that property for us
  constructor(private tasksSerivce: TasksService) {}
  // now we can access tasks service within TasksController with 'this'

  // createing subroute on tasks route
  @Get() // get http method on empty route will run the below function
  getAlltasks(@Query() query: GetTaskFilterDto, @GetUser() user: Users) {
    // return type is also definedin controller
    return this.tasksSerivce.getAllTasks(query, user);
  }
  @Post()
  async postTasks(
    @Body() createTask: CreateTaskDto,
    @GetUser() user: Users,
  ): Promise<Task> {
    return await this.tasksSerivce.createTasks(createTask, user);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<Task> {
    return await this.tasksSerivce.getTaksById(id, user);
  }

  @Delete(':id')
  async deleteByID(@Param('id') id: string,@GetUser() user : Users) {
    const data = await this.tasksSerivce.deleteTaskByID(id,user);
    return { status: 'success' };
  }

  // @Patch(':id/:status')
  // updateStatusA(@Param('id') id: string, @Param('status') status){
  //     return this.tasksSerivce.updateStatus(id,status)
  // }

  ////////////// getting status value from the body
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,@GetUser() user : Users) {
    return this.tasksSerivce.updateStatus(id, updateTaskDto.status,user);
  }
}

/// dummy databases controller method

// // createing subroute on tasks route
// @Get() // get http method on empty route will run the below function
// getAlltasks(@Query() query:GetTaskFilterDto){// return type is also definedin controller
//     if (Object.keys(query).length /* checking wether there are any query string */){
//         return this.tasksSerivce.getTaksByFeature(query)
//     }
//     return this.tasksSerivce.getAllTasks();
// }
