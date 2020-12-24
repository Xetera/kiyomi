/// <reference types="next" />
/// <reference types="next/types/global" />

declare module NodeJS {
  interface Global {
    prisma?: PrismaClient;
  }
}
