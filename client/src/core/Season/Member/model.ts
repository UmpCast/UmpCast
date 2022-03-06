import {
    SeasonPermission,
    SeasonMemberAddScreen_StatusFragment
} from '@/generated'

export type SeasonMemberAddPendingRequest = {
    [SeasonPermission.Referee]: boolean
    [SeasonPermission.Manager]: boolean
    status: SeasonMemberAddScreen_StatusFragment
}

export type SeasonMemberAddPendingBatch = SeasonMemberAddPendingRequest[]
