import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as expressSession from "express-session"
import * as passport from "passport"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import { PrismaClient } from "@prisma/client"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Swagger Docs
  const options = new DocumentBuilder()
    .setTitle("Nestjs")
    .setDescription("The nestjs API description")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup("docs", app, document)
  const isProduction = process.env.NODE_ENV === "production"
  const cookieSecret = process.env.COOKIE_SECRET
  if (isProduction && !cookieSecret) {
    throw Error(
      `Tried to initialize the server in production without a cookie secret. set the COOKIE_SECRET env variable`,
    )
  }
  app.enableCors()
  app.use(
    expressSession({
      cookie: {
        // we need to allow subdomains for production
        domain: isProduction ? ".kiyomi.io" : "localhost",
        sameSite: "lax",
        secure: isProduction,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      },
      secret: cookieSecret ?? "dreamcatcher first win pls",
      resave: false,
      saveUninitialized: true,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT || 9000)
}

bootstrap()
