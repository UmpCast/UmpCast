export enum ComponentID {
    FORM_CONTROL = 'FormControl',
    FORM_INPUT = 'FormInput',
    CORE = 'Core'
}

export enum IconID {
    DIVISION_EDIT = 'DivisionEdit',
    DIVISION_CREATE = 'DivisionCreate',
    POSITION_CREATE = 'PositionCreate',
    SEASON_CREATE = 'SeasonCreate'
}

export type TestID = ComponentID | IconID

export function buildID(id: TestID, ...rest: string[]) {
    return [id, ...rest].join(':')
}
