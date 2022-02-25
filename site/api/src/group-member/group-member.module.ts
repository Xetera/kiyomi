import { Module } from '@nestjs/common';
import { GroupMemberService } from './group-member.service';
import { GroupMemberResolver } from "./group-member.resolver";
import { GroupModule } from "../group/group.module";
import { PersonModule } from "../person/person.module";

@Module({
  imports: [GroupModule, PersonModule],
  providers: [GroupMemberService, GroupMemberResolver],
  exports: [GroupMemberService]
})
export class GroupMemberModule {}
