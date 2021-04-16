const fetch = require("node-fetch");
const fs = require("fs");
const jiu = require("./members/160.json");
const path = require("path");
const FormData = require("form-data");
const members = require("./members.json");

const production = true;

const JIU = 157;
const SUA = 158;
const SIYEON = 159;
const HANDONG = 160;
const YOOHYEON = 161;
const DAMI = 162;
const GAHYEON = 163;

function humanFileSize(bytes, dp = 1) {
  const thresh = 1000;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

const body = {
  p_key: process.env.TOKEN,
};

const MAX_CONTENT_LENGTH = 8_000_000;
const parallelMap = (arr, fn, max) => {
  const out = [];
  const initial = [...Array(max)];
  const fired = initial.map(() =>
    Promise.resolve().then(async function cb() {
      if (!arr.length) return;

      const next = arr.shift();
      out.push(await fn(next));
      return cb();
    })
  );
  return Promise.all(fired).then(() => out);
};

const imageSize = (url) =>
  fetch(url, { method: "HEAD" }).then((r) => r.headers.get("content-length"));

let _queue = Promise.resolve();

const uploadFile = async (url, person, imageId) => {
  const form = new FormData();
  form.append("file", url);
  form.append("source", "Irenebot (https://github.com/MujyKun/IreneBot)");
  form.append("ireneBotImageId", imageId);
  form.append("ireneBotIdolId", person.id);
  form.append("ireneBotIdolName", person.fullname);
  const response = await fetch(
    production
      ? "https://mamamoo.solar/api/image/upload"
      : "http://localhost:3000/api/image/upload",
    {
      method: "POST",
      headers: {
        Authorization: production
          ? "SIMP_123327eb205d16f2bd1f73ff32615e5b9fca7ac9520d2ff1f7ad57e9f93ce7bb"
          : "SIMP_3e237d76bfd6d4afe2987ba80b6636e91e6920e0fff3d8de12eb8773d41ca9b2",
      },
      body: form,
    }
  ).then((r) => r.json());
  console.log(response);
};

const DC = [JIU, SUA, SIYEON, HANDONG, YOOHYEON, DAMI, GAHYEON];

async function memes(id, person) {
  try {
    const res = await fetch(`https://api.irenebot.com/file/${id}/`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        "User-Agent": "simp.pics crawler",
      },
      redirect: "manual",
    });
    if (res.status === 500) {
      console.log(`${id} responded with 500`);
      return;
    }
    const imageLocation = res.headers.get("location");
    if (!imageLocation) {
      console.log("uhhhh, no image?");
      console.log(res);
      console.log(res.headers);
      return;
    }
    console.log(
      `Got valid response from ${id}. ${imageLocation}. STATUS = ${res.status}`
    );
    const size = await imageSize(imageLocation);
    const human = humanFileSize(size);
    console.log(`${id} has filesize: ${human}`);
    if (size > MAX_CONTENT_LENGTH) {
      console.log(`skipping ${id} because it's too big = ${human}`);
      return;
    }
    uploadFile(imageLocation, person, id);
  } catch (err) {
    console.log(`Unable to upload image: ${id}`);
    console.error(err);
  }
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const target = 162;
const imagesOfIdol = (t) => require(`./members/${t}.json`);

parallelMap(
  [YOOHYEON].flatMap((d) =>
    imagesOfIdol(d)
      .slice(0, 1000)
      .map((image) => ({
        imageId: image.id,
        personId: d,
      }))
  ),
  async ({ imageId, personId }) => {
    const person = members.find((member) => member.id === personId);
    await memes(imageId, person);
    // production download delay
    await sleep(2000);
  },
  5
).then((r) => {
  console.log("done!");
  // process.exit(0);
});

function pleaseDontExit() {
  setTimeout(pleaseDontExit, 1000);
}

pleaseDontExit();

// }

// for (const member of DC) {
//   fetch().then(async (r) => {
//     const file = fs.createWriteStream(`members/${member}.json`);
//     r.body.pipe(file);
//   });
// }
