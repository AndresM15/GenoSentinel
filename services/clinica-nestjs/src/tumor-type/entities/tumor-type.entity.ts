import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TumorType {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    name: string

    @Column()
    systemAffected: string
}