import { createSdk } from "../../client"
import fetch from "node-fetch"
const prod = process.env.NODE_ENV === "production"

;(async () => {
  const sdk = createSdk()
  const { people } = await sdk.allPersons()

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
