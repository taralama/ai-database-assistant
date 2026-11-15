import { Entity, Column, ChildEntity } from 'typeorm'
import { Content } from './Content';

@ChildEntity()
export class Question extends Content {
    @Column({type:'varchar'})
    quesCount!:string;
    
}