import { HttpException, Injectable } from '@nestjs/common';
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

  async get(code: string) {
    const levelOne = await this.policyHoldersRepo.findOne({
      where: { code },
    });
    if (!levelOne) {
      throw new HttpException('Policyholder not found', 404);
    }

    const levelTwo = await this.policyHoldersRepo.findBy({
      parentCode: code,
    });

    const left = levelTwo[levelTwo.findIndex((e) => e.isLeftChild === true)];
    const right = levelTwo[levelTwo.findIndex((e) => e.isLeftChild === false)];

    const result = {
      ...levelOne,
      l: [],
      r: [],
    };

    const leftCodes = [];
    const rightCodes = [];

    if (left) {
      result.l.push(left);
      leftCodes.push(left.code);
    }
    if (right) {
      result.r.push(right);
      rightCodes.push(right.code);
    }

    const layer = 4;
    for (let i = 2; i < layer; i++) {
      //left
      const l = [];
      while (leftCodes.length > 0) {
        const parentCode = leftCodes.pop();
        const children = await this.policyHoldersRepo.findBy({
          parentCode,
        });
        l.push(...children);
      }
      l.forEach((e) => leftCodes.push(e.code));
      result.l.push(...l);

      //right
      const r = [];
      while (rightCodes.length > 0) {
        const parentCode = rightCodes.pop();
        const children = await this.policyHoldersRepo.findBy({
          parentCode,
        });
        r.push(...children);
      }
      r.forEach((e) => rightCodes.push(e.code));
      result.r.push(...r);
    }

    function propertiesCleanUpAndSorting() {
      delete result.parentCode;
      delete result.isLeftChild;
      result.l.forEach((ele) => {
        if (ele) {
          delete ele.parentCode;
          delete ele.isLeftChild;
        }
      });
      result.r.forEach((ele) => {
        if (ele) {
          delete ele.parentCode;
          delete ele.isLeftChild;
        }
      });
      result.l.sort((a, b) => (a.code as any) - (b.code as any));
      result.r.sort((a, b) => (a.code as any) - (b.code as any));
    }
    propertiesCleanUpAndSorting();

    return result;
  }

  async getTop(code: string) {
    const node = await this.policyHoldersRepo.findOne({
      where: { code },
    });
    if (!node || !node.parentCode) {
      throw new HttpException('Policyholder not found', 404);
    }
    return await this.get(node.parentCode);
  }

  async deleteAll() {
    const holders = await this.policyHoldersRepo.find();
    await this.policyHoldersRepo.remove(holders);
    return true;
  }
}
