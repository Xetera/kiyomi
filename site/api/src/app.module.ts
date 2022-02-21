import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ImageModule as ImageModuleOld } from "./image/image.module"
import { MediaModule } from "./media/media.module"
import { GraphQLModule } from "@nestjs/graphql"
import { PrismaModule } from "./prisma/prisma.module"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from './user/user.module';
import * as path from "node:path"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development.local", ".env.development", ".env"],
      isGlobal: true,
    }),
    PrismaModule,
    MediaModule,
    ImageModuleOld,
    ConfigModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: path.join(process.cwd(), "src/__generated__/schema.gql"),
    }),
  ],
  exports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
