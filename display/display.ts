import { colors } from "../utils/deps.ts";
import { DISPLAY_TEXT_WIDTH, HEADER_LENGTH } from "./constants.ts";

export type Formatter = (text: string) => string;

export interface TemplateActions {
  header: (text: string, level?: number) => void;
  list: (items: string[]) => void;
  error: (err: Error | string) => void;
  render: () => void;
  p: (text: string) => void;
  newline: () => void;
}

// module private helpers
// theme functions

const headers: Record<number, Formatter> = {
  1: (text: string) => colors.bgGreen(` ${text.padEnd(HEADER_LENGTH, " ")}`) + "\n",
  2: (text: string) => colors.blue(text),
  3: (text: string) => colors.brightGreen(` ${text}`),
};

const dot = colors.blue("•");

function* toLines(longText: string): Generator<string> {
  // todo sep should be /\s/
  // todo should support new lines?!
  const words = longText.split(" ");
  let line = "";
  while (words.length) {
    const next = words.shift() as string;
    if (line.length + next.length < DISPLAY_TEXT_WIDTH) {
      line += line === "" ? next : ` ${next}`;
    } else {
      yield line;
      line = next;
    }
  }
  if (line !== "") {
    yield line;
  }
}

export default class Display implements TemplateActions {
  lines: string[] = [];
  tpl: TemplateActions;

  constructor() {
    const { header, list, error, render, p, newline } = this;
    this.tpl = {
      header: header.bind(this),
      list: list.bind(this),
      error: error.bind(this),
      render: render.bind(this),
      p: p.bind(this),
      newline: newline.bind(this),
    };
  }

  header(text: string, level = 1) {
    this.lines.push(headers[level](text));
  }

  list(items: string[]) {
    for (const item of items) {
      this.lines.push(`${dot} ${item}`);
    }
  }

  error(err: Error | string) {
    this.lines.push(colors.red(err.toString()));
  }

  render() {
    console.log(this.toString());
  }

  p(text: string) {
    for (const line of toLines(text)) {
      this.lines.push(line);
    }
    this.newline();
  }

  newline() {
    this.lines.push("");
  }

  toString() {
    return this.lines.join("\n");
  }
}
