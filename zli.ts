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
import Display from "./display/display.ts";

async function main(command: string, inputs: string[]): Promise<number> {
  const display = new Display();
  switch (command) {
    case "help":
      return help(display.tpl);
    case "ip":
      return ip(display.tpl);
  }
  display.error(`unknown command: ${command}`);
  display.render();
  return UNKNOWN_COMMAND;
}

const [cmd, ...inputs] = Deno.args;

try {
  const status = await main(cmd, inputs);
  Deno.exit(status);
} catch (err) {
  console.error(err?.toString());
  Deno.exit(UNHANDLED_ERROR);
}
