import { Module } from "@nestjs/common";
import { TumorTypeService } from "./services/tumor-type.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TumorTypeController } from "./controllers/tumor-type.controller";
import { TumorType } from "./entities/tumor-type.entity";

/**
 * Módulo que agrupa el controlador y el servicio de TumorType.
 * Importa la entidad para que TypeORM pueda usar el repositorio.
 */

@Module({
  controllers: [TumorTypeController],
  providers: [TumorTypeService],
  imports: [TypeOrmModule.forFeature([TumorType])]
})
export class TumorTypeModule {}
