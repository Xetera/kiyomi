import child_process from "child_process";

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

const timeoutAfter = (ms: number, reason: string) =>
  wait(ms).then(() => Promise.reject(new Error(reason)));

type ChildStdoutOptions = {
  timeout?: number;
  timeoutError?: string;
  stdin?: Buffer;
};

function grabChildStdout(command: string, opts: ChildStdoutOptions) {
  const [binary, ...args] = command.split(" ");
  const child = child_process.spawn(binary, args, {
    stdio: "pipe",
  });
  return Promise.race<Promise<string>>([
    timeoutAfter(
      opts.timeout ?? 4000,
      opts.timeoutError ?? "Process timed out while waiting for child stdout"
    ),
    new Promise((res, rej) => {
      if (opts.stdin) {
        child.stdin!.write(opts.stdin);
      }
      child.stdin.end();
      child.stdout!.on("data", (m) => {
        res(m.toString());
        child.kill();
      });
      child.stderr!.on("data", rej);
      child.stderr!.on("error", rej);
      child.on("error", rej);
    }),
  ]);
}

export function phash(image: Buffer): Promise<string> {
  return grabChildStdout("python3 ./phash.py", {
    timeout: 2000,
    timeoutError: "Hashing function timed out",
    stdin: image,
  });
}

export async function colorPalette(image: Buffer): Promise<number[]> {
  const stdout = await grabChildStdout("python3 ./colors.py", {
    timeout: 2000,
    timeoutError: "Color palette generation timed out",
    stdin: image,
  });
  return JSON.parse(stdout);
}
