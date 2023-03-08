import { colors } from "../utils/deps.ts";

export default function list(items: unknown[]) {
  for (const item of items) {
    console.log(colors.blue(`• ${item}`));
  }
}
