import * as fs from "fs";
import { phash } from "./ffi";

(async () => {
  const data = await fs.promises.readFile("./a.webp");
  console.log(await phash(data));
})();
