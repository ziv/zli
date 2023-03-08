export default function uintToString(input: Uint8Array): string {
  return new TextDecoder().decode(input);
}
