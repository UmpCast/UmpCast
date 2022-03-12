import { SeasonMemberAddScreen_OrganizationMemberFragment } from '@/generated'

export type SeasonMemberAddRequest = {
    referee: boolean
    manager: boolean
    member: SeasonMemberAddScreen_OrganizationMemberFragment
}

export type SeasonRole = 'referee' | 'manager'
