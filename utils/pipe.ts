export default function pipe(...func: Function[]) {
  return (ctx: unknown) => func.reduce((acc, cur) => cur(acc), ctx);
}
