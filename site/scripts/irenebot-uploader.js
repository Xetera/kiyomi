const fetch = require("node-fetch")
const fs = require("fs")
const path = require("path")
const FormData = require("form-data")
const members = require("./members.json")

const production = false

const JIU = 157
const SUA = 158
const SIYEON = 159
const HANDONG = 160
const YOOHYEON = 161
const DAMI = 162
const GAHYEON = 163

function humanFileSize(bytes, dp = 1) {
  const thresh = 1000

  if (Math.abs(bytes) < thresh) {
    return bytes + " B"
  }

  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  )

  return bytes.toFixed(dp) + " " + units[u]
}

const body = {
  p_key: process.env.TOKEN,
}

const MAX_CONTENT_LENGTH = 8_000_000
const parallelMap = (arr, fn, max) => {
  const out = []
  const initial = [...Array(max)]
  const fired = initial.map(() =>
    Promise.resolve().then(async function cb() {
      if (!arr.length) return

      const next = arr.shift()
      out.push(await fn(next))
      return cb()
    })
  )
  return Promise.all(fired).then(() => out)
}

const imageSize = (url) =>
  fetch(url, { method: "HEAD" }).then((r) => r.headers.get("content-length"))

let _queue = Promise.resolve()

const getIrene = (url, opts) =>
  fetch(`https://api.irenebot.com/${url}/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      "User-Agent": "simp.pics crawler",
    },
    redirect: "manual",
    ...opts,
  })

const uploadFile = async (url, person, imageId) => {
  const form = new FormData()
  form.append("file", url)
  console.log(url)
  form.append("public", "true")
  form.append("source", "Irenebot (https://github.com/MujyKun/IreneBot)")
  form.append("ireneBotId", imageId)
  form.append("ireneBotIdolId", person.id)
  form.append("ireneBotIdolName", person.full_name)
  const response = await fetch(
    production
      ? "https://kiyomi.io/api/image/upload"
      : "http://localhost:3000/api/image/upload",
    {
      method: "POST",
      headers: {
        Authorization: process.env.AUTHORIZATION,
      },
      body: form,
    }
  ).then((r) => r.json())
  console.log(response)
}

const DC = [JIU, SUA, SIYEON, HANDONG, YOOHYEON, DAMI, GAHYEON]

async function memes(id, person) {
  try {
    const res = await getIrene(`/file/${id}`, {
      redirect: "manual",
    })
    if (res.status === 500) {
      console.log(`${id} responded with 500`)
      return
    }
    const imageLocation = res.headers.get("location")
    if (!imageLocation) {
      console.log("uhhhh, no image?")
      console.log(res)
      console.log(res.headers)
      return
    }
    console.log(
      `Got valid response from ${id}. ${imageLocation}. STATUS = ${res.status}`
    )
    const size = await imageSize(imageLocation)
    const human = humanFileSize(size)
    console.log(`${id} has filesize: ${human}`)
    if (size > MAX_CONTENT_LENGTH) {
      console.log(`skipping ${id} because it's too big = ${human}`)
      return
    }
    uploadFile(imageLocation, person, id)
  } catch (err) {
    console.log(`Unable to upload image: ${id}`)
    console.error(err)
  }
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const imagesOfIdol = async (t) => {
  const get = () => require(`./members/${t}.json`).ids.slice(0, 5)
  try {
    return get()
  } catch (err) {
    console.log(err)
    await syncMemberImages(t)
    return get()
  }
}

async function downloadImages() {
  const idolIds = [1, 2, 3, 4]
  const getImages = async (d) =>
    (await imagesOfIdol(d)).slice(0, 5).map((image) => ({
      imageId: image,
      personId: d,
    }))
  const inputs = (await Promise.all(idolIds.map(getImages))).flat()
  parallelMap(
    inputs,
    async ({ imageId, personId }) => {
      const person = members[personId]
      await memes(imageId, { ...person, id: personId })
      // production download delay
      await sleep(2000)
    },
    5
  ).then((r) => {
    console.log("done!")
    // process.exit(0);
  })
}

async function syncMemberImages(id) {
  const result = await getIrene(`/photos/${id}/list`, {
    method: "GET",
  }).then((r) => r.buffer())
  await fs.promises.writeFile(`./members/${id}.json`, result)
}

async function syncImages() {
  const mems = Object.entries(members).slice(0, 5)
  await parallelMap(mems, async ([id, person]) => {
    syncMemberImages(id)
    await sleep(2000)
  })
  process.exit(0)
}

function pleaseDontExit() {
  setTimeout(pleaseDontExit, 1000)
}

downloadImages()
pleaseDontExit()

// }

// for (const member of DC) {
//   fetch().then(async (r) => {
//     const file = fs.createWriteStream(`members/${member}.json`);
//     r.body.pipe(file);
//   });
// }
