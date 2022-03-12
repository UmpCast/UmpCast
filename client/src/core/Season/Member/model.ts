import { SeasonMemberAddScreen_OrganizationMemberEdgeFragment } from '@/generated'

export type SeasonMemberAddRequest = {
    referee: boolean
    manager: boolean
    member: SeasonMemberAddScreen_OrganizationMemberEdgeFragment
}

export type SeasonRole = 'referee' | 'manager'
