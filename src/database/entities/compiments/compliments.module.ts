import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compliments } from './compliments.entity';
import { ComplimentsService } from './compliments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Compliments])],
  providers: [ComplimentsService],
  exports: [TypeOrmModule, ComplimentsService],
})
export class ComplimentsModule {}
