import { IsNotEmpty, IsString } from "class-validator";

export class CreateTumorTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    systemAffected: string;
}
