import { Test, TestingModule } from "@nestjs/testing"
import { GroupService } from "./group.service"
import { PrismaService } from "../prisma/prisma.service"
import sub from "date-fns/sub"
import add from "date-fns/add"
import { Group } from "@prisma/client"
import { GroupStatusModel } from "./models/group-status.model"

describe("GroupService", () => {
  let service: GroupService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupService],
    }).compile()

    service = module.get<GroupService>(GroupService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})

describe("GroupService->status", () => {
  let groupService: GroupService
  beforeEach(() => {
    groupService = new GroupService(new PrismaService())
  })
  it("detects active groups with no disband date", async () => {
    const status = await groupService.status({
      debutDate: sub(new Date(), { days: 1 }),
    } as Group)
    expect(status).toBe(GroupStatusModel.ACTIVE)
  })

  it("detects active groups with known disband date", async () => {
    const status = await groupService.status({
      debutDate: sub(new Date(), { days: 1 }),
      disbandDate: add(new Date(), { days: 7 }),
    } as Group)
    expect(status).toBe(GroupStatusModel.ACTIVE)
  })

  it("detects disbanded groups", async () => {
    const status = await groupService.status({
      debutDate: sub(new Date(), { days: 20 }),
      disbandDate: sub(new Date(), { days: 7 }),
    } as Group)
    expect(status).toBe(GroupStatusModel.DISBANDED)
  })

  it("detects pre-debut", async () => {
    const status = await groupService.status({
      debutDate: add(new Date(), { days: 20 }),
    } as Group)
    expect(status).toBe(GroupStatusModel.PRE_DEBUT)
  })
})
