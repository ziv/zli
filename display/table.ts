export type TableData = Record<string, string>;
export type TableHeaders = Record<string, number>;

const TableMap = {
  top: ["┌", "─", "┬", "┐"],
  cel: ["|"],
  dsh: ["├", "─", "┼", "┤"],
  bot: ["└", "─", "┴", "┘"],
};
/*
┌───────┬─────┬─────┐
│ (idx) │ 0   │ 1   │
├───────┼─────┼─────┤
│     0 │ "a" │ "b" │
│     1 │ "c" │ "d" │
└───────┴─────┴─────┘
*/

export default function table(data: TableData[]) {
  if (!data.length) {
    return "";
  }
  const headers: Record<string, number> = {};

  for (const item of data) {
    for (const [header, value] of Object.entries(item)) {
      headers[header] = Math.max(value.length, headers[header] || 0);
    }
  }

  // print top
  let top = "┌";
  for (const l of Object.values(headers)) {
    top += "─".repeat(l) + "";
  }
  // '─';
  console.log(headers);
  // const headers = Object.keys(data[0]);
}
