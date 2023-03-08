import {
  MISSING_ARGUMENTS_ERROR,
  UNHANDLED_ERROR,
  UNKNOWN_COMMAND,
} from "./errors.ts";

if (Deno.args.length < 1) {
  console.error("missing arguments");
  Deno.exit(MISSING_ARGUMENTS_ERROR);
}

import ip from "./commands/ip.ts";
import help from "./commands/help.ts";

async function main(command: string): Promise<number> {
  switch (command) {
    case "help":
      return help();
    case "ip":
      return ip();
  }
  return UNKNOWN_COMMAND;
}

const [cmd, ...inputs] = Deno.args;

try {
  const status = await main(cmd);
  Deno.exit(status);
} catch (err) {
  console.error(err?.toString());
  Deno.exit(UNHANDLED_ERROR);
}
