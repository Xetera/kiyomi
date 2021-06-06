import fetch from "node-fetch"
import { backend } from "@/../shared/sdk"
const prod = process.env.NODE_ENV === "production"

;(async () => {
  const { people } = await backend.query({
    people: {
      id: true,
      name: true,
      aliases: {
        name: true,
      },
    },
  })

  const PREFIX = prod ? "https://search.mamamoo.solar" : "http://localhost:7700"
  const toUpload = people.map((person) => ({
    id: person.id,
    name: person.name,
    aliases: person.aliases.map((alias) => alias.name),
  }))
  const response = await fetch(`${PREFIX}/indexes/idols/documents`, {
    method: "POST",
    body: JSON.stringify(toUpload),
  })
  console.log(await response.json())
})()
