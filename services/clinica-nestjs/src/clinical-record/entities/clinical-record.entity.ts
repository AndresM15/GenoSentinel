import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClinicalRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string
}
