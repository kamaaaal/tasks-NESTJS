import { ConsoleLogger, HttpException, NotFoundException } from '@nestjs/common';
import { Users } from 'src/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/createTask.dto';
import { GetTaskFilterDto } from '../dto/getTasksFilter.dto';
import { Task } from '../entities/task.entity';
import { StatusType } from '../tasks-status.enum';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async deleteTaskById(id: string,user : Users): Promise<void> {
    const deleted = await this.delete({ id ,user});
    // console.log(deleted.affected);
    if (!deleted.affected) {
      throw new NotFoundException('no rows were deleted');
    }
  }

  async getAllTasks(getTasksDto: GetTaskFilterDto,user :Users) {
    const { search, status } = getTasksDto;

    const query = this.createQueryBuilder('task')
    .where({user}); //now withim the query we can use task keyword to refer task entity

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere('(task.title LIKE :searchStr OR task.description LIKE :searchStr)', {
        searchStr: `%${search}%`,
      });
    }

    return query.getMany();
  }

  async findTaskById(id: string,user : Users) {
    const query = this.createQueryBuilder('task');
    query.where({id,user})
    return query.getOne();
  }

  /// will save task in the db , this will be used by service class
  async saveTask(createTask: CreateTaskDto,user : Users): Promise<Task> {
    /// desctructing properties of dto
    const { title, description } = createTask;
    /// creating a task object from repository
    const task = this.create({
      title,
      description,
      status: StatusType.OPEN,
      user
    });
    /// .save() is an asynchronos method which will save the object as row in database
    await this.save(task);
    return task;
  }

  async UpdateTask(id: string, status: string,user : Users): Promise<Task> {
    const query = this.createQueryBuilder('task')
    //find condition  
    query.where ({id,user})
    /// returning value 
      return query.getOne()
      .then((task) => {
        if (!task) throw new NotFoundException('No Tasks found');
        task.status = StatusType[status];
        return this.save(task);
      })
      .catch((err) => {
        if (err.message === 'No Tasks found') throw err;
        throw new HttpException(err.message, 400);
      });
  }
}
