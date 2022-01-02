import { Role as RoleTable } from "@prisma/client"
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { getSession } from "next-auth/client"
import { URLSearchParams } from "url"

export const NO_PERMISSIONS = "no-permissions"

export enum Role {
  User = "USER",
  Editor = "EDITOR",
  Administrator = "ADMINISTRATOR",
}

const roleValues = Object.values(Role)

export const filterValidRoles = (roles: string[]) =>
  roles.filter((role) => (roleValues as string[]).includes(role)) as Role[]

export const PermissionsFor = {
  editingIdol: [Role.Editor],
  editingGroup: [Role.Editor],
} as const

export function hasRole(roles: RoleTable[], roleCheck: Role) {
  return roles.some((role) => role.name === roleCheck)
}

export const withAuthorizedUser = <T>(
  roles: readonly Role[],
  f: (user: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>>
) => async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<T>> => {
  const { req } = ctx
  const sess = await getSession({ req })
  const hasAllRoles = roles.every((role) => sess?.user.roles.includes(role))
  if (!sess?.user || !hasAllRoles) {
    const reqUrl = new URLSearchParams({
      "fail-reason": NO_PERMISSIONS,
    })
    return {
      // TODO: make this redirect more intelligent?
      redirect: {
        destination: `/?${reqUrl.toString()}`,
        permanent: false,
      },
    }
  }
  return await f(ctx)
}

export function canViewPrivateImages() {}
