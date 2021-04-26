import { Role as RoleTable } from "@prisma/client";
export enum Role {
  User = "USER",
  Editor = "EDITOR",
  Administrator = "ADMINISTRATOR",
}

export function hasRole(roles: RoleTable[], roleCheck: Role) {
  return roles.some((role) => role.name === roleCheck);
}

export function canViewPrivateImages() {

}