import { forwardRef, Module } from '@nestjs/common';
import { PersonService } from "./person.service";
import { PersonResolver } from "./person.resolver";
import { GroupMemberModule } from "../group-member/group-member.module";

@Module({
  imports: [forwardRef(() => GroupMemberModule)],
  providers: [PersonService, PersonResolver],
  exports: [PersonService]
})
export class PersonModule {}
