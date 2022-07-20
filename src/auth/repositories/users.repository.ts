import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/tasks/entities/task.entity";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../Dto/authCredentials.dto";
import { Users } from "../entities/user.entity";
// import { genSalt,hash} from 'bcrypt';
const { genSalt,hash } = require('bcrypt')
;
@EntityRepository(Users)
export class UsersRepository{
  findAllUser() {
        return this.usersRepository.find()
    }
    constructor(
        @InjectRepository(Users)
        private usersRepository : Repository<Users>
    ){}


//  a query code for my test whihc does'nt do anything with this project

query() {
    return this.usersRepository.createQueryBuilder('user')
                        //field name   //jointable  //alias   // fields to be joined
                                        //secondary  
    .innerJoinAndMapOne('user.gottenTask','task',    'task',   'user.task = task.title')
    // .where(`task.title = 'buy'`)
    .select(['user.username','task.title']) // select statement if no entity name mentioned will
                                            // get raw fields, without parent object
                                            // meaning it wont be a objects property
                                            // itwill be  just a variable
    .getOne()
    // .getRawMany()
    // .getQuery()
}

    // signUp or createUser
    async createUser(authCredentialsDto : AuthCredentialsDto) : Promise<Users>{
        // const {username, password } = authCredentialsDto; 
        try{
            // geting salt 
            const salt = await  genSalt();
            // console.log(salt);
            const hashedpassword = await hash(authCredentialsDto.password.toString(),salt);
            // console.log(hashedpassword);
            authCredentialsDto.password = hashedpassword;
            const user = this.usersRepository.create(authCredentialsDto);
            const saved = await this.usersRepository.save(user);
            return saved;
        }
        catch(error){
            if (error.code === '23505'){
                throw new ConflictException('username already exists');
            }
            else {
                console.error(error);
                throw new InternalServerErrorException(error);
            }
        }
    }

    async findByName(userName : string){
        return this.usersRepository.findOne({where : {username : userName}});
    }

}