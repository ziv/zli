export default async function run(
  command: string,
  ...opts: string[]
): Promise<Uint8Array> {
  const p = Deno.run({ cmd: [command, ...opts], stdout: "piped" });
  const output = await p.output();
  p.close();
  return output;
}
