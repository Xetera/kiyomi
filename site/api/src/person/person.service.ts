import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Alias, Appearance, GroupMember, Person } from "@prisma/client"
import { Cursor, GraphqlService } from "../graphql/graphql.service"
import { PeopleListModel } from "./models/people-list.model"

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  findById(id: number): Promise<Person | null> {
    return this.prisma.person.findUnique({
      where: {
        id,
      },
    })
  }

  aliases(personId: number): Promise<Alias[]> {
    return this.prisma.alias.findMany({
      where: { personId },
    })
  }

  preferredAlias(aliasId: number): Promise<Alias | null> {
    return this.prisma.alias.findUnique({
      where: { id: aliasId },
    })
  }

  appearances(personId: number): Promise<Appearance[]> {
    return this.prisma.appearance.findMany({
      where: { id: personId },
    })
  }

  groupMembers(personId: number): Promise<GroupMember[]> {
    return this.prisma.groupMember.findMany({ where: { personId } })
  }

  async persons(cursor?: string): Promise<PeopleListModel> {
    const id = cursor ? GraphqlService.fromCursor(cursor) : undefined
    const people = await this.prisma.person.findMany({
      ...GraphqlService.baseCursor(50, id),
      orderBy: {
        // make this based on some kind of popularity in the future
        id: "desc",
      },
    })
    const nextCursor = GraphqlService.deriveCursor(people, Cursor.Homepage)
    return {
      cursor: nextCursor,
      people,
    }
  }

  async nationalities(id: number): Promise<string[]> {
    const nationalities = await this.prisma.personNationality.findMany({
      where: { personId: id },
    })
    return nationalities.map((n) => n.country)
  }
}
