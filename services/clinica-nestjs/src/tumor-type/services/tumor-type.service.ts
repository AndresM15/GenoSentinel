import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TumorType } from "../entities/tumor-type.entity";
import { CreateTumorTypeDto } from "../dto/create-tumor-type.dto";
import { ResponseTumorTypeDto } from "../dto/response-tumor-type.dto";

/**
 * 
 * 
 * 
 */

@Injectable()
export class TumorTypeService {
    constructor(
        @InjectRepository(TumorType) private readonly tumorTypeRepository: Repository<TumorType>
    ){}

    async createTumorType(createTumorTypeDto: CreateTumorTypeDto){
        try{
        // 1.) Extraer la información del tipo de tumor
         const {name,systemAffected} = createTumorTypeDto

        // 2.) Crear el objeto que se va a guardar en la base de datos
        const tumorType: TumorType = this.tumorTypeRepository.create({
            name,
            systemAffected
        });

        // 3.) Guardar el objeto en base de datos.
        const saveDataDto = await this.tumorTypeRepository.save(tumorType)

        // 4.) Mapear el DTO a entidad de forma manual
        const responseDto: ResponseTumorTypeDto = {
            id: saveDataDto.id,
            name: saveDataDto.name,
            systemAffected: saveDataDto.systemAffected
        }

        // Retornar el DTO de salida con los datos del tumor-type guardado
        return responseDto;

        }catch(error){
            throw new HttpException('Error al guardar el tipo de tumor', HttpStatus.BAD_REQUEST);
        }
    }

    async findAllTumorTypes(){
        try{
            // 1.) Obtener los tipos de tumores guardados en la base de datos
            const tumors = await this.tumorTypeRepository.find()

            // 2.) Inicializar la lista vacía para almacenar los DTOs
            const responseDto: ResponseTumorTypeDto[] = [];

            // 3.) Iterar y mapear cada DTO 
            for(let i = 0; i < tumors.length; i++){
                const t = tumors[i]
                const dto: ResponseTumorTypeDto = {
                    id: t.id,
                    name: t.name,
                    systemAffected: t.systemAffected
                }
                // Agregamos el DTO mapeado a la lista que se devolverá al cliente
               responseDto.push(dto);
            }

            // Retornamos la lista de tipos de tumores ya mapeada a DTOs
            return responseDto

            // 4.) Manejo de excepciones en caso de que ningun paciente esté registrado.
        }catch(error){
            throw new HttpException('La lista de tipos de tumores esta vacia', HttpStatus.NOT_FOUND)
        }
    }

    async findOneByTumorType(id: number){

        // 1.) Obtener un tipo de tumor en especifico guardado en la base de datos
        const saveTumorType = await this.tumorTypeRepository.findOne( { where:{ id } } )

         // 2.) Manejo de excepciones en caso de que el tipo de tumor no exista
        if(!saveTumorType){
            throw new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND)
        }
         // 4.) Mapear el DTO a entidad de forma manual
        const responseDto: ResponseTumorTypeDto = {
            id: saveTumorType.id,
            name: saveTumorType.name,
            systemAffected: saveTumorType.systemAffected
        }

        // 5.) Retornamos el DTO de respuesta ya mapeado
        return responseDto;
    }

}