import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compliments } from './compliments.entity';
import { Repository } from 'typeorm';
import { innerJoinIfNotYet } from '../../builderUtils';

@Injectable()
export class ComplimentsService {
  constructor(
    @InjectRepository(Compliments)
    private complimentsRepo: Repository<Compliments>,
  ) {}

  async createBaseQuery(table: string = 'compliments') {
    return await this.complimentsRepo.createQueryBuilder(table);
  }

  async getRandomCompliment() {
    const query = await this.createBaseQuery();
    query
      .leftJoinAndSelect('compliments.user', 'users')
      .orderBy('RANDOM()')
      .limit(1);
    return await query.getOne();
  }
}
