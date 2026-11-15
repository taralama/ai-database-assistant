import { Entity, Column, PrimaryGeneratedColumn, TableInheritance } from 'typeorm'

@Entity()
@TableInheritance({column:{type:'varchar',name:'type'}})
export class Content {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    name!: string;

    @Column({ type: 'varchar' })
 desc!:number;
    
}