import { Exclude } from "class-transformer";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({
        unique : true
    })
    username : string;

    @Column()
    password: string;

    @OneToMany(() => Task,(task :Task) => task.user, { eager : true} )
    tasks : string;
     
} 