import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Representa un tipo de tumor en la base de datos.
 * Contiene el nombre del tumor y el sistema afectado.
 */

@Entity("tumor-types")
export class TumorType {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    systemAffected: string
}