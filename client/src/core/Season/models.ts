export type SeasonPositionItem =
    | {
          id: string
          name?: string | null
      }
    | null
    | undefined

export type SeasonDivisionItem =
    | {
          id: string
          name?: string | null
          positionList?: (SeasonPositionItem | null)[] | null
      }
    | null
    | undefined
