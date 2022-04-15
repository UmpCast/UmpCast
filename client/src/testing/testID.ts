export enum TestID {
    FORM_CONTROL = 'FormControl',
    FORM_INPUT = 'FormInput',
    COMPONENT = 'Component',
    ICON = 'Icon'
}

export enum IconID {
    DIVISION_EDIT = 'DivisionEdit',
    DIVISION_CREATE = 'DivisionCreate',
    POSITION_CREATE = 'PositionCreate',
    SEASON_CREATE = 'SeasonCreate',
    CALENDAR_LAST_WEEK = 'CalendarLastWeek',
    CALENDAR_NEXT_WEEK = 'CalendarNextWeek',
    GAME_CREATE = 'GameCreate'
}

export interface TestIDArg {
    [TestID.FORM_CONTROL]: string
    [TestID.FORM_INPUT]: string
    [TestID.COMPONENT]: string
    [TestID.ICON]: IconID
}

export function buildID<TKey extends keyof TestIDArg>(
    type: TKey,
    id: TestIDArg[TKey],
    ...rest: string[]
) {
    return [type, id, ...rest].join(':')
}
