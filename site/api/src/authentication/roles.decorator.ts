import { SetMetadata } from "@nestjs/common"
import { RoleKind } from "./role"

export const ROLES_KEY = Symbol("Metadata key for user roles")
export const Roles = (...roles: RoleKind[]) => SetMetadata(ROLES_KEY, roles)
