import { access, AnyObject, keys, MaybeAccessor } from "@solid-primitives/utils";
import { Accessor, createMemo, on } from "solid-js";

// CONVERT
export * from "./convert";

// STRING

/**
 * Signal builder: `String.prototype.toLowerCase()`
 */
export const lowercase = (string: Accessor<string>) => createMemo(() => string().toLowerCase());
/**
 * Signal builder: `String.prototype.toUpperCase()`
 */
export const uppercase = (string: Accessor<string>) => createMemo(() => string().toUpperCase());
/**
 * Signal builder: capitalize a string input
 */
export const capitalize = (string: Accessor<string>) =>
  createMemo(on(string, s => s[0].toUpperCase() + s.substring(1).toLowerCase()));
/**
 * Signal builder: `String.prototype.substring()`
 */
export const substring = (
  string: MaybeAccessor<string>,
  start: MaybeAccessor<number>,
  end?: MaybeAccessor<number>
) => createMemo(() => access(string).substring(access(start), access(end)));

// NUMBER
export * from "./number";

// ARRAY
export * from "./array";

// OBJECT
export * from "./object";
export * from "./update";

// SPECIAL
export type Spread<T extends [] | any[] | AnyObject> = {
  [I in keyof T]: Accessor<T[I]>;
};
/**
 * Turn your signal into a tuple of signals, or map of signals. **(input needs to have static keys)**
 * @example // spread tuples
 * const [first, second, third] = spread(() => [1,2,3])
 * first() // => 1
 * second() // => 2
 * third() // => 3
 * @example // spread objects
 * const { name, age } = spread(() => ({ name: "John", age: 36 }))
 * name() // => "John"
 * age() // => 36
 */
export function spread<T extends [] | any[] | AnyObject>(obj: Accessor<T>): Spread<T> {
  const res: Spread<T> = obj().constructor();
  for (const key of keys(obj)) {
    res[key] = () => obj()[key];
  }
  return res;
}