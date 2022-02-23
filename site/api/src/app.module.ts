import { Logger, Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ImageModule as ImageModuleOld } from "./image/image.module"
import { MediaModule } from "./media/media.module"
import { GraphQLModule } from "@nestjs/graphql"
import { PrismaModule } from "./prisma/prisma.module"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from './user/user.module';
import { AppearanceModule } from './appearance/appearance.module';
import { PersonService } from './person/person.service';
import { PersonModule } from './person/person.module';
import { UploaderService } from './uploader/uploader.service';
import { UploaderModule } from './uploader/uploader.module';
import { S3Module } from './s3/s3.module';
import { ImgProxyModule } from './imgproxy/imgproxy.module';
import * as path from "node:path"
import { GraphQLError } from "graphql"
import { GraphQLFormattedError } from "graphql"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development.local", ".env.development", ".env"],
      isGlobal: true,
      cache: true,
    }),
    PrismaModule,
    MediaModule,
    ImageModuleOld,
    ConfigModule,
    UserModule,
    AppearanceModule,
    PersonModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
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
        };
        return graphQLFormattedError;
      },
    }),
    UploaderModule,
    S3Module,
    ImgProxyModule,
  ],
  exports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, PersonService, UploaderService],
})
export class AppModule {}
