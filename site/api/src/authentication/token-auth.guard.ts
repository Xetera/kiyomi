import {
  ExecutionContext,
  Injectable,
  CanActivate,
  Inject,
} from "@nestjs/common"
import { Request } from "express"
import { AuthenticationService } from "./authentication.service"
import { Reflector } from "@nestjs/core"
import { ROLES_KEY } from "./roles.decorator"
import { RoleKind } from "./role"

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthenticationService,
    private readonly refl: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const auth = request.headers.authorization

    if (!auth) {
      return false
    }

    const requiredRoles = this.refl.getAllAndOverride<RoleKind[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    const user = await this.auth.userFromToken(auth)
    request.user = user ?? undefined

    if (!user) {
      return false
    }

    if (!requiredRoles) {
      return true
    }

    return this.auth.hasAllRoles(user, requiredRoles)
  }
}
