/** return typed keys array - for gotchas see: https://stackoverflow.com/a/55012175/3056284 */
export function keys<O>(o: O) {
  return Object.keys(o) as (keyof O)[];
}
