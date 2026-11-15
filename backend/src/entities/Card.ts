import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    type!: string;

    @Column({ type: 'varchar' })
 category!:number;
    
}