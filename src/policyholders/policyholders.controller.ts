import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Query,
} from '@nestjs/common';
import { PolicyholdersService } from './policyholders.service';

@Controller('api/policyholders')
export class PolicyholdersController {
  constructor(private readonly policyholdersService: PolicyholdersService) {}

  @Get()
  async get(@Query('code') code: string) {
    if (!code) {
      throw new HttpException('Code is required', 400);
    }
    return this.policyholdersService.get(code);
  }

  @Get(':code/top')
  async getTop(@Param('code') code: string) {
    return this.policyholdersService.getTop(code);
  }

  @Delete()
  async delete() {
    return this.policyholdersService.deleteAll();
  }
}
