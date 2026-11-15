import { Entity, Column, ChildEntity } from 'typeorm'
import { Content } from './Content';

@ChildEntity()
export class Post extends Content {
    @Column({type:'varchar'})
    viewCount!:string;
    
}