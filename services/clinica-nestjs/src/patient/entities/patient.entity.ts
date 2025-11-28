import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

// Creación de una variable tipo "enum" llamada status.
export enum status {
  ACTIVE = 'Active',
  FOLLOW_UP = 'Follow_Up', //Seguimiento
  INACTIVAE = 'Inactive'
}

/**
 * Entidad Patient:
 * - Representa los datos personales del paciente.
 * - Campos: id (UUID), nombres, fecha de nacimiento, género y estado.
 * - El campo `status` es un enum con valor por defecto ACTIVE.
 */

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  birth_date: Date; // TypeORM usa Date para mapear el tipo DATE de la base de datos.

  @Column({ type: 'enum', enum: gender })
  // Usamos el tipo de dato 'enum'.
  gender: gender;

  // En nuestra base de datos definimos que el "enum status" por defecto es ACTIVE.
  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;
}
