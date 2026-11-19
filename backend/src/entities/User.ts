import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Course } from "./Course";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    email!: string;

    @Column({ type: "varchar" })
    phone!: string;

    @ManyToMany(() => Course, (course) => course.id)
    @JoinTable({
        name: "user_course",
        joinColumn: {
            name: "user_id",
            foreignKeyConstraintName: "id",
        },
        inverseJoinColumn: {
            name: "course_id", // Custom column name for the OTHER entity (Course)
            referencedColumnName: "id", // Primary key column in Course table
        },
    })
    course: number;
}
