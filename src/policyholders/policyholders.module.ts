import { Module } from '@nestjs/common';
import { PolicyholdersService } from './policyholders.service';
import { PolicyholdersController } from './policyholders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policyholders } from 'src/entities/policyholders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Policyholders])],
  controllers: [PolicyholdersController],
  providers: [PolicyholdersService],
})
export class PolicyholdersModule {}
