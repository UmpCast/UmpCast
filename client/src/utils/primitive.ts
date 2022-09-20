export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>
      }
    : T

export const joinArrays = (arr1: any[], arr2: any[], spread: boolean = false) =>
    arr1.flatMap((e1) => arr2.map((e2) => (spread ? { ...e1, ...e2 } : [e1, e2])))

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function range(size: number, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt)
}
