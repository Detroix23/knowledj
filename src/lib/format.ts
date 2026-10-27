/*!
 * # Knowledge - library.
 * src/lib/format.ts
 * 
 * String general formats.
 */

/** Fill `input` with `fill` to reach `n` characters. */
export const leftFill = (input: string, n: number, fill: string): string => (
  fill.repeat(Math.max(n - input.length, 0)) + input
);

/** Format _Years-Months-Days_ with no space and file-system compatible characters. */
export const dateYMDFormal = (date: Date): string => [
  date.getFullYear(),
  date.getMonth(),
  date.getDay(),
].map(d => leftFill(d.toString(), 2, "0")).join("-");

/** Format _Hours-Minutes-Seconds_ with no space and file-system compatible characters. */
export const dateHMSFormal = (date: Date): string => [
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
].map(d => leftFill(d.toString(), 2, "0")).join("-");

/** Format a `Date` with no space and file-system compatible characters. */
export const dateFormal = (date: Date): string => (
  dateYMDFormal(date) + "_" + dateHMSFormal(date)
);

export default { leftFill, dateYMDFormal, dateHMSFormal, dateFormal };
