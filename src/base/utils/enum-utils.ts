export function getNumericEnumKeys<E extends Record<string, number | string>>(enumObject: E): Array<keyof E> {
  return Object.values(enumObject).filter((key) => typeof key === 'string') as unknown as Array<keyof E>;
}
