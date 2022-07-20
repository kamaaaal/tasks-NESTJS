import { Exclude } from "class-transformer";
import { Users } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { StatusType } from "../tasks-status.enum";

@Entity()
export class Task{
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column()
    title : string;

    @Column()
    description: string;

    @Column()
    status : StatusType;

    @ManyToOne(
        () => Users,
        Users => Users.tasks
    )
    @Exclude({toPlainOnly : true})
    user : Users;
};