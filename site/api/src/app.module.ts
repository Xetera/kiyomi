import { Logger, Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ImageModule as ImageModuleOld } from "./image/image.module"
import { MediaModule } from "./media/media.module"
import { GraphQLModule } from "@nestjs/graphql"
import { PrismaModule } from "./prisma/prisma.module"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UserModule } from "./user/user.module"
import { AppearanceModule } from "./appearance/appearance.module"
import { PersonService } from "./person/person.service"
import { PersonModule } from "./person/person.module"
import { UploaderService } from "./uploader/uploader.service"
import { UploaderModule } from "./uploader/uploader.module"
import { S3Module } from "./s3/s3.module"
import { ImgProxyModule } from "./imgproxy/imgproxy.module"
import * as path from "node:path"
import { GraphQLError, GraphQLFormattedError } from "graphql"
import { GroupModule } from "./group/group.module"
import { AliasModule } from "./alias/alias.module"
import { GroupMemberModule } from "./group-member/group-member.module"
import { PassportModule } from "@nestjs/passport"
import { HttpModule } from "@nestjs/axios"
import { FaceModule } from "./face/face.module"
import { AuthenticationModule } from "./authentication/authentication.module"
import { ServeStaticModule } from "@nestjs/serve-static"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development.local", ".env.development", ".env"],
      isGlobal: true,
      cache: true,
    }),
    PassportModule.register({ session: true }),
    HttpModule,
    PrismaModule,
    MediaModule,
    ImageModuleOld,
    UserModule,
    AppearanceModule,
    PersonModule,
    GroupModule,
    AliasModule,
    AuthenticationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Always allow introspection :)
      introspection: true,
      playground: true,
      debug: true,
      cors: {
        origin: "*",
      },
      autoSchemaFile: path.join(process.cwd(), "src/__generated__/schema.gql"),
      formatError: (error: GraphQLError) => {
        if (error.extensions?.code === "INTERNAL_SERVER_ERROR") {
          Logger.error(error)
          console.error(error.extensions.exception?.stacktrace?.join("\n"))
          return {
            message: "Internal server error",
          }
        }
        // TODO: allow more detailed validation errors
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        }
        return graphQLFormattedError
      },
    }),
    UploaderModule,
    S3Module,
    ImgProxyModule,
    GroupMemberModule,
    FaceModule,
    ServeStaticModule.forRoot({ rootPath: "./public" }),
  ],
  controllers: [AppController],
  providers: [AppService, PersonService, UploaderService, ConfigService],
})
export class AppModule {}
