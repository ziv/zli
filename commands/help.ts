import { TemplateActions } from "../display/display.ts";

export default function help({ header, render, p, list }: TemplateActions): number {
  header("ZLI HELP");
  header("Usage", 2);
  p("$ zli <command> [options]");
  p("use 'zli <command> --help' for details about the command");
  header("Commands", 2);
  list(["help", "ip"]);
  render();
  return 0;
}
