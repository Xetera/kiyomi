import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: [
                { level: 'query', emit: 'event' },
                { level: 'warn', emit: 'event' },
                { level: 'info', emit: 'event' },
                { level: 'error', emit: 'event' },
            ],
        });
    }

    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}
