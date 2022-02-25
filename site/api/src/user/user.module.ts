import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from "./user.resolver";

@Module({
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
