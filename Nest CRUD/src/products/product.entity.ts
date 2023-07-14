import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'prod_id'
    })
    prodId: number

    @Column({
        nullable: false,
        default: ''
    })
    title: string
    
    @Column({
        nullable: false,
        default: 0
    })
    price: number

    @Column()
    createdAt: Date
}