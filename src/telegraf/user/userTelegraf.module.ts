import { Module } from '@nestjs/common';
import { UserTelegrafService } from './userTelegraf.service';
import { UsersModule } from '../../database/entities/user/users.module';
import { ComplimentsModule } from '../../database/entities/compiments/compliments.module';

@Module({
  imports: [UsersModule, ComplimentsModule],
  providers: [UserTelegrafService],
})
export class UserTelegrafModule {}
