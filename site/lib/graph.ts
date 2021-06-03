import { PrismaClient, Image } from ".prisma/client"
import { uniqBy } from "lodash"

export async function imageConnections(
  base: Image,
  maxDepth: number,
  prisma: PrismaClient
) {
  async function queryPersonConnections(
    personIds: number[],
    excludeImages: number[] = [],
    depth = 0
  ) {
    if (depth > maxDepth) {
      return []
    }
    const appearances = await prisma.appearance.findMany({
      where: {
        personId: { in: personIds },
        imageId: { notIn: excludeImages },
      },
      include: {
        image: true,
      },
    })
    const next = await queryImageConnections(
      appearances.map((app) => app.imageId),
      appearances.map((app) => app.personId),
      depth + 1
    )
    return [
      {
        people: [],
        images: uniqBy(
          appearances.map((app) => app.image),
          (img) => img.id
        ),
        edges: appearances.map((app) => ({
          type: "PERSON_TO_IMAGE",
          from: app.personId,
          to: app.imageId,
        })),
      },
      ...next,
    ]
  }
  async function queryImageConnections(
    imageIds: number[],
    excludePeople: number[] = [],
    depth = 0
  ) {
    if (depth > maxDepth) {
      return []
    }
    const appearances = await prisma.appearance.findMany({
      where: {
        imageId: { in: imageIds },
        personId: { notIn: excludePeople },
      },
      include: {
        person: true,
      },
    })

    const next = await queryPersonConnections(
      appearances.map((app) => app.personId),
      appearances.map((app) => app.imageId),
      depth + 1
    )
    return [
      {
        people: uniqBy(
          appearances.map((app) => app.person),
          (person) => person.id
        ),
        images: [],
        edges: appearances.map((app) => ({
          type: "IMAGE_TO_PERSON",
          from: app.imageId,
          to: app.personId,
        })),
      },
      ...next,
    ]
  }
  let appearances = await queryImageConnections([base.id])

  return appearances.reduce(
    (all, level) => {
      all.images = all.images.concat(
        level.images.filter((im) =>
          all.images.every((other) => other.id !== im.id)
        )
      )
      all.people = all.people.concat(
        level.people.filter((pe) =>
          all.people.every((other) => other.id !== pe.id)
        )
      )
      // duplicate edges are already removed
      all.edges = all.edges.concat(level.edges)
      return all
    },
    { images: [base], people: [], edges: [] }
  )
}
