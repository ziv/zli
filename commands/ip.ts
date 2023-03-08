import { COMMAND_ERROR, SUCCESS } from "../errors.ts";
import uintToString from "../strings/uint-to-string.ts";
import run from "../utils/run.ts";
import lines from "../strings/lines.ts";
import words from "../strings/words.ts";
import type { TemplateActions } from "../display/display.ts";

const CMD = "ifconfig";
const IPV4_ID = "inet ";

// todo add support for help
export function help() {
  return `fetch list of IPv4 binding`;
}

export default async function ip(
  { header, list, render }: TemplateActions,
): Promise<number> {
  try {
    const output = await run(CMD);
    const ips = lines(uintToString(output))
      .filter((line) => line.includes(IPV4_ID))
      .map(words)
      .map(([, ip]) => ip);

    header("IPv4");
    list(ips);
    render();
    return SUCCESS;
  } catch (err) {
    // todo use formatter for errors
    console.error(err);
    return COMMAND_ERROR;
  }
}
