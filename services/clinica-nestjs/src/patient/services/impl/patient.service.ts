import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { gender, Patient, status } from '../../entities/patient.entity';
import { CreatePatientDto } from '../../dto/create-patient.dto';
import { IPatientService } from '../interface/patient.service.interface';
import { PatientResponseDto } from 'src/patient/dto/response-patient.dto';
import { UpdatePatientDto } from 'src/patient/dto/update-patient.dto';
import { first } from 'rxjs';
import { stringify } from 'querystring';

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
            
              // 2.) Convertir o transoformar los datos pertinentes.
            const transformer_date = new Date(birth_date);


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

            // Manejo de excepciones en caso de que ningun paciente esté registrado.
        }catch(error){
            throw new HttpException('La lista de pacientes está vacia', HttpStatus.NOT_FOUND)
        }
    }
    

    async findOneByPatient(id: string): Promise<PatientResponseDto> {

            // 1.) Obtener un paciente especifico guardado en la base de datos
            const savePatient = await this.patientRepository.findOne( { where:{ id } } )

            // 2.) Manejo de excepciones en caso de que el paciente no exista
            if(!savePatient){
                throw new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND)
            }

           // 3.) Mapeamos el DTO a entidad  
            const responseDto: PatientResponseDto = {
                id: savePatient.id,
                first_name: savePatient.first_name,
                last_name: savePatient.last_name,
                birth_date: new Date(savePatient.birth_date).toISOString(),
                gender: savePatient.gender,
                status: savePatient.status
            }

            // 4.) Retornamos el DTO de respuesta ya mapeado
            return responseDto 
    }

    async updatePatient(id: string, updatePatient: UpdatePatientDto): Promise<PatientResponseDto> {
        // 1.) Envía los datos para actualizar paciente
        await this.patientRepository.update(id, updatePatient)

        // 2.) Obtener el paciente actualizado
        const updatedPatient = await this.patientRepository.findOne({where:{id}})

        // 3.) Verifica que el paciente ya existe
        if(!updatedPatient){
            throw new HttpException('Paciente no encontrado' , HttpStatus.NOT_FOUND)
        }

        // 4.) Mapear manualmente los DTOs a entidad
        const responseDto: PatientResponseDto = {
            id: updatedPatient.id,
            first_name: updatedPatient.first_name,
            last_name: updatedPatient.last_name,
            birth_date: new Date(updatedPatient.birth_date).toISOString(),
            gender: updatedPatient.gender,
            status: updatedPatient.status
        }

        // 5.) Retornamos el DTO de salida mapeados
        return responseDto
    }
    
    deactivatePatient(id: string): Promise<status> {
        throw new Error('Method not implemented.');
    }

}
