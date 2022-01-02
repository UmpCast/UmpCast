export enum TempRoutes {
    Unregistered = 'Unregistered',
    Authenticated = 'Authenticated'
}

export type TempParamList = {
    [TempRoutes.Unregistered]: undefined
    [TempRoutes.Authenticated]: undefined
}
