import child_process from "child_process";

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

const timeoutAfter = (ms: number, reason: string) =>
  wait(ms).then(() => Promise.reject(new Error(reason)));

export function phash(image: Buffer): Promise<string> {
  const child = child_process.spawn("python", ["./phash.py"], {
    stdio: "pipe",
  });
  return Promise.race<Promise<string>>([
    timeoutAfter(2000, "Hashing function timed out"),
    new Promise((res, rej) => {
      child.stdin!.write(image);
      child.stdin.end();
      child.stdout!.on("data", m => {
        res(m.toString());
        child.kill();
      });
      child.stderr!.on("data", rej);
      child.stderr!.on("error", rej);
      child.on("error", rej);
    }),
  ]);
}
