import { HttpException, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Policyholders } from 'src/entities/policyholders.entity';
import { Repository } from 'typeorm';
import { seed } from './seed';

@Injectable()
export class PolicyholdersService {
  constructor(
    @InjectRepository(Policyholders)
    private policyHoldersRepo: Repository<Policyholders>,
  ) {}

  async seed() {
    const holders = this.policyHoldersRepo.create(seed);
    await this.policyHoldersRepo.save(holders);
  }
}
