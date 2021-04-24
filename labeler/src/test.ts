import * as fs from "fs";
import { phash } from "./phash";

(async () => {
  const data = await fs.promises.readFile("1.webp");
  console.log(await phash(data));
})();