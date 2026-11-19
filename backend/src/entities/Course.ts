import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    course_name: string;

    @ManyToMany(() => User, (user) => user.id)
    user: number;
}
