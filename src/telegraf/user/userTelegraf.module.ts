import { Module } from '@nestjs/common';
import { UserTelegrafService } from './userTelegraf.service';
import { UserModule } from '../../database/entities/user/user.module';

@Module({
  imports: [UserModule],
  providers: [UserTelegrafService],
})
export class UserTelegrafModule {}
