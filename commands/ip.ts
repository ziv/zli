import { COMMAND_ERROR } from "../errors.ts";
import uintToString from "../strings/uint-to-string.ts";
import run from "../utils/run.ts";
import list from "../display/list.ts";
import title from "../display/title.ts";
import lines from "../strings/lines.ts";
import words from "../strings/words.ts";

const CMD = "ifconfig";
const IPV4_ID = "inet ";

// todo add support for help
export function help() {
  return `fetch list of IPv4 binding`;
}

export default async function ip(): Promise<number> {
  try {
    const output = await run(CMD);
    title("IPv4");
    list(
      lines(uintToString(output))
        .filter((line) => line.includes(IPV4_ID))
        .map(words)
        .map(([, ip]) => ip),
    );
    return 0;
  } catch (err) {
    // todo use formatter for errors
    console.error(err);
    return COMMAND_ERROR;
  }
}
