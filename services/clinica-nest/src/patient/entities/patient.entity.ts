// Decoradores (Entity,Column,etc) necesarios para la creación de la tabla "Patient"
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Creación de una variable tipo "enum" llamada gender.
export enum gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

// Creación de una variable tipo "enum" llamada status.
export enum status {
  ACTIVE = 'Active',
  FOLLOW_UP = 'FollowUp',
  INACTIVE = 'Inactive'
}

// Entidad Patient. Definimos sus atributos y etiquetas '@'.
@Entity("patient")
export class Patient {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    birth_date: string

    @Column({ type: 'enum', enum: gender })
     // Usamos el tipo de dato 'enum'.
    gender: gender             

     // En nuestra base de datos definimos que el "enum status" por defecto es ACTIVE.
    @Column({ type: 'enum', enum: status, default: status.ACTIVE })
    status: status      

}
