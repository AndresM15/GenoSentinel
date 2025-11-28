import { IsNotEmpty, IsString } from "class-validator";

/**
 * DTO para recibir los datos necesarios para crear un tipo de tumor.
 */

export class CreateTumorTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    systemAffected: string;
}
