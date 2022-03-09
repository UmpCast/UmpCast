import { SeasonMemberAddScreen_StatusFragment } from '@/generated'

export type SeasonMemberAddRequest = {
    referee: boolean
    manager: boolean
    status: SeasonMemberAddScreen_StatusFragment
}

export type SeasonRole = 'referee' | 'manager'
