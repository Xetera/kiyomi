import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Alias, Person } from "@prisma/client"

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {
  }

  findById(id: number): Promise<Person | null> {
    return this.prisma.person.findUnique({
      where: {
        id,
      },
    })
  }

  aliases(personId: number): Promise<Alias[]> {
    return this.prisma.alias.findMany({
      where: { id: personId },
    })
  }
}
