import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Patient, status } from '../../entities/patient.entity';
import { CreatePatientDto } from '../../dto/create-patient.dto';
import { IPatientService } from '../interface/patient.service.interface';
import { PatientResponseDto } from 'src/patient/dto/response-patient.dto';
import { UpdatePatientDto } from 'src/patient/dto/update-patient.dto';
import { first } from 'rxjs';

@Injectable()
export class PatientService implements IPatientService{
    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>
    ){}
    async createPatient(createPatientDto: CreatePatientDto): Promise<PatientResponseDto> {
        try{
            // 1.) Extraer la información del paciente
            const {first_name,last_name,birth_date,gender} = createPatientDto
            
            // 2.) Convertimos o transformamos los pertinentes del paciente
            const transformer_date = new Date(birth_date)

            // 3.) Crear el objeto que se va a guardar en base de datos.
            const patient: Patient = this.patientRepository.create({
                first_name,
                last_name,
                birth_date: transformer_date,
                gender
            });

            // 4.) Guardar el objeto en base de datos.
            const saveDataDto = await this.patientRepository.save(patient)

            // 5.) Mapeamos el DTO a entidad
            const responseDto: PatientResponseDto = {
                id: saveDataDto.id,
                first_name: saveDataDto.first_name,
                last_name: saveDataDto.last_name,
                birth_date: saveDataDto.birth_date.toISOString(),
                gender: saveDataDto.gender,
                status: saveDataDto.status
            }
            
            // Retornar el DTO de salida con los datos del paciente guardado
            return responseDto

            // 6.) Manejo de errores.
        }catch(error){
            throw new HttpException('Error al guardar el paciente', HttpStatus.BAD_REQUEST);
        }
    }

    async findAllPatients(): Promise<PatientResponseDto[]> {
        try{
            // 1.) Obtener los pacientes guardados en la base de datos
            const patients = await this.patientRepository.find()

            // 2.) Lista vacía para almacenar los DTOs
            const responseDto: PatientResponseDto[] = [];

            if(responseDto)

            // 3.) Iterar y mapear cada paciente a DTO
            for(let i = 0; i < patients.length; i++){
                const p = patients[i]
                const dtoOut: PatientResponseDto = {
                    id: p.id,
                    first_name: p.first_name,
                    last_name: p.last_name,
                    birth_date: new Date(p.birth_date).toISOString(), // convertir a Date antes de ISO
                    gender: p.gender,
                    status: p.status
                };

                // Agregamos el DTO mapeado a la lista que se devolverá al cliente
                responseDto.push(dtoOut)
            }        

            // Retornamos la lista de pacientes ya mapeada a DTOs
            console.log("Mostrar Pacientes",responseDto)
            return responseDto

        }catch(error){
            throw new HttpException("La lista de pacientes está vacia", HttpStatus.NOT_FOUND)
        }
    }
    

    findOneByPatient(id: string): Promise<PatientResponseDto> {
        throw new Error('Method not implemented.');
    }
    updatePatient(id: string, updatePatient: UpdatePatientDto): Promise<PatientResponseDto> {
        throw new Error('Method not implemented.');
    }
    deactivatePatient(id: string): Promise<status> {
        throw new Error('Method not implemented.');
    }

}
