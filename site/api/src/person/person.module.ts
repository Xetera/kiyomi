import { Module } from '@nestjs/common';
import { PersonService } from "./person.service";
import { PersonResolver } from "./person.resolver";

@Module({
  providers: [PersonService, PersonResolver],
})
export class PersonModule {}
