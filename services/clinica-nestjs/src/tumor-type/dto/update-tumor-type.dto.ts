import { IsOptional, IsString } from "class-validator";

export class UpdateTumorType{
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    systemAffected: string;
}