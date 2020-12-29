const fetch = require("node-fetch");
const fs = require("fs");
const jiu = require("./members/160.json");
const path = require("path");
const FormData = require("form-data");
const members = require("./members.json");

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

const MAX_CONTENT_LENGTH = 6_000_000;
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
function set(data) {
  _queue = _queue.then(async () => {
    await fs.promises.writeFile(
      path.join(__dirname, "results.json"),
      JSON.stringify(data)
    );
  });
}

const uploadFile = async (url, person) => {
  const form = new FormData();
  form.append("file", url);
  form.append("source", "Irenebot (https://github.com/MujyKun/IreneBot)");
  form.append("person_id", person.id);
  form.append("person_name", person.fullname);
  const response = await fetch("http://localhost:3000/api/image/upload", {
    method: "POST",
    headers: {
      Authorization:
        "SIMP_b367dbb15ee0082e9ff1978a918d2ee54ee111b50fe3dc1faf1e340f9c04b6a0",
    },
    body: form,
  }).then((r) => r.json());
  console.log(response);
};

const DC = [JIU, SUA, SIYEON, HANDONG, YOOHYEON, DAMI, GAHYEON];

async function memes(id, results, person) {
  if (id in results) {
    console.log(`${id} was already fetched`);
    return;
  }
  const res = await fetch(`https://api.irenebot.com/file/${id}`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
    redirect: "manual",
  });
  if (res.status === 500) {
    console.log(`${id} responded with 500`);
    results[id] = -1;
    return set(results);
  }
  const imageLocation = res.headers.get("location");
  if (!imageLocation) {
    console.log("uhhhh, no image?");
    console.log(res);
    console.log(res.headers);
    return;
  }
  console.log(`Got valid response from ${id}. STATUS = ${res.status}`);
  const size = await imageSize(imageLocation);
  if (size > MAX_CONTENT_LENGTH) {
    console.log(`skipping ${id} because it's too big = ${humanFileSize(size)}`);
    results[id] = -1;
    return set(results);
  }
  uploadFile(imageLocation, person);
  results[id] = 1;
  return set(results);
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const target = 162;
const makeImages = (t) => require(`./members/${t}.json`);

parallelMap(
  DC.flatMap((d) =>
    makeImages(d)
      .slice(300, 310)
      .map((image) => ({
        imageId: image.id,
        personId: d,
      }))
  ),
  async ({ imageId, personId }) => {
    const person = members.find((member) => member.id === personId);
    const results = JSON.parse(
      await _queue.then((_) =>
        fs.promises.readFile(path.join(__dirname, "results.json"), "utf-8")
      )
    );
    await memes(imageId, results, person);
  },
  5
).then((r) => {
  console.log("done!");
  process.exit(0);
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