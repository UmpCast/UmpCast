import {
    SeasonPermission,
    SeasonMemberAddScreen_StatusFragment
} from '@/generated'

export type SeasonMemberAddRequest = {
    [SeasonPermission.Referee]: boolean
    [SeasonPermission.Manager]: boolean
    status: SeasonMemberAddScreen_StatusFragment
}
