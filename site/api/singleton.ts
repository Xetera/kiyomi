import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended"
import prisma from "./mock-prisma-client"
import { PrismaService } from "./src/prisma/prisma.service"

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

export const prismaServiceMock = new PrismaService()