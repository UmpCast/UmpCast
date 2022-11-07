export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>
      }
    : T

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
