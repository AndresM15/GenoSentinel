import { Patient } from "src/patient/entities/patient.entity";
import { TumorType } from "src/tumor-type/entities/tumor-type.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum cancerStage {
  I = 'I',
  IIA = 'IIA',
  IIB = 'IIB',
  III = 'III',
  IV = 'IV'
}

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
    diagnosisDate: Date

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
