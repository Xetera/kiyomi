import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as expressSession from 'express-session';
import * as passport from "passport";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Swagger Docs
    const options = new DocumentBuilder()
        .setTitle('Nestjs')
        .setDescription('The nestjs API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('docs', app, document);
    app.enableCors();
    app.use(
        expressSession({
            cookie: {
                maxAge: 7 * 24 * 60 * 60 * 1000 // ms
            },
            secret: 'a santa at nasa',
            resave: true,
            saveUninitialized: true,
            // @ts-ignore
            store: new PrismaSessionStore(new PrismaClient(), {
                checkPeriod: 2 * 60 * 1000,  //ms
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            })
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(process.env.PORT || 9000);
}

bootstrap();