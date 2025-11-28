import { Patient } from "../../patient/entities/patient.entity";
import { TumorType } from "../../tumor-type/entities/tumor-type.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum cancerStage {
  I = 'I',
  IIA = 'IIA',
  IIB = 'IIB',
  III = 'III',
  IV = 'IV'
}

/**
 * Entidad ClinicalRecord:
 *  - Representa el historial clínico de un paciente.
 *  - Relaciona un paciente con un tipo de tumor.
 *  - Incluye fecha de diagnóstico, etapa del cáncer y protocolo de tratamiento.
 *  - Define relaciones ManyToOne con Patient y TumorType.
 */

@Entity()
export class ClinicalRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string

    //Foreign Key explícita
    @Column({ type: 'uuid' })
    patientId: string;

    //Foreign Key explícita
    @Column({ type: 'int' })
    tumorTypeId: number;

    @Column()
    diagnos_is_Date: Date

    @Column({ type: 'enum', enum: cancerStage })
    stage: cancerStage

    @Column()
    treatmentProtocol: string

    // Relación con Patient
    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patientId' })
    patient: Patient;

    // Relación con Tumor Type
    @ManyToOne(() => TumorType)
    @JoinColumn({ name: 'tumorTypeId' })
    tumorType: TumorType;
}
