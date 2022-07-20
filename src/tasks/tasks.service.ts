import { NotFoundException, HttpException, Injectable } from '@nestjs/common';
import { StatusType} from "./tasks-status.enum"
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskFilterDto } from './dto/getTasksFilter.dto';
import { TaskRepository } from './repositories/tasks.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { create } from 'domain';
import { GetUser } from 'src/auth/get-user.decorator';
import { Users } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository
    ){}

    async getTaksById(id : string,user : Users) : Promise<Task>{
        const found = await this.taskRepository.findTaskById(id,user)
        if (!found){ throw new NotFoundException(`no task found with id ${id}`)};
        return found;
    }

    async createTasks(createTask : CreateTaskDto,user : Users): Promise<Task>{
        return this.taskRepository.saveTask(createTask,user);
    }


    async getAllTasks(getTasksDto : GetTaskFilterDto,user : Users) {
        return this.taskRepository.getAllTasks(getTasksDto,user);
    }
    async deleteTaskByID(id : string,user : Users): Promise<void> {
        const deleted = await this.taskRepository.deleteTaskById(id,user);
        // if (!deleted) {throw new NotFoundException(`no Tasks can be deleted with this id ${id}`)};
        return deleted;
    }

    updateStatus(id:string, status:string,user : Users){
        return this.taskRepository.UpdateTask(id,status.toUpperCase(),user);
    }
    getTaksByFeature(query: GetTaskFilterDto){}
}



///////////////////old Task Service



// @Injectable()
// export class TasksService {
//     getTaksByFeature(query: GetTaskFilterDto):TaskModel[] {
//         const {search,status} = query;
//         /// temporarty tasks array to hold filtered taks
//         let tasks = []
//         if (status){
//             const filtered = this.tasks.filter(task => task.status === status);
//             tasks = tasks.concat(filtered);
//         }
//         if (search){
//             /// to perform a string search here we use .inclues() method
//             const filtered = this.tasks.filter((task) =>{
//                 if (task.title.includes(search) || task.description?.includes(search))
//                 /// searching whther any property has the passed in string as search query string
//                 return true;
//             })
//             tasks = tasks.concat(filtered);
//         }
//         return tasks
//     }

//     // crating a private attribute  so that other classes dont mutate them
//     private tasks:TaskModel[] = [];

//     // access modifier is not mentioned here so the default public visisbility is set to it
//     getAllTasks() :TaskModel[]{
//         return this.tasks;
//     }

//     createTasks(createTask : CreateTaskDto){
//         console.log(createTask);
//         const {title,description} = createTask;
//         const task: TaskModel = {
//             id : uuid(),
//             title,
//             description,
//             status : StatusType.OPEN,
//         }  
//         console.log("created taks ====",task)
//         this.tasks.push(task);
//         return task
//     }
//     /// update method
//     updateStatus(id:string, status:string) {
//         const found = this.tasks.find(task => task.id === id);
//         if (!found) {throw new NotFoundException('no task found on that id')};
//         found.status = StatusType[status.toUpperCase()];
//         return found;
//     }
//     getTaksById(id : string):TaskModel{
//         const task = this.tasks.find((task) =>  {return task.id === id});
//         // throwing error if no task found on that id
//         if (!task) {throw new NotFoundException('no task found on that id')};
//         return task;
//     }

//     //  a function to delete a task by an id
//     deleteTaskByID(id : string):TaskModel{
//         const index = this.tasks.findIndex(task => task.id === id);
//         if (index < 0) {throw new NotFoundException('no task found on that id')};
//         const [deleted] = this.tasks.splice(index,1);
//         return deleted;
//     }
// }
