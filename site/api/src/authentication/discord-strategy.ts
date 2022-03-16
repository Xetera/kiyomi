import { Profile, Strategy } from "passport-discord"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { AuthenticationService } from "./authentication.service"

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get("DISCORD_CLIENT_ID"),
      clientSecret: configService.get("DISCORD_CLIENT_SECRET"),
      callbackURL: configService.get("DISCORD_CALLBACK_URL"),
      scope: ["identify"],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return this.authService.validateUser({
      username: profile.username,
      discordId: profile.id,
      avatar: profile.avatar ?? undefined,
      discriminator: profile.discriminator,
      refreshToken,
      accessToken,
    })
  }
}
