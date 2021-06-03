import { generateUserToken } from "@/lib/auth"
import { handle, withUser } from "@/lib/middleware"
import { hasRole, Role } from "@/lib/permissions"

export default handle(
  withUser(
    async (req, res, { user, db }) => {
      if (req.method === "POST") {
        const roles = await db.role.findMany({
          where: {
            userId: user.id,
          },
        })
        if (!hasRole(roles, Role.Administrator)) {
          return res.status(403).end()
        }
        res.json(
          await db.user.create({
            data: {
              name: req.query.name as string,
              token: generateUserToken(),
              bot: req.query.bot === "true",
            },
          })
        )
      } else {
        res.status(405).end()
      }
    },
    { strict: true }
  )
)
