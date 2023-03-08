import { colors } from "../utils/deps.ts";

export default function title(input: string) {
  console.log(colors.bgGreen(` ${input.padEnd(40, " ")}`));
}
