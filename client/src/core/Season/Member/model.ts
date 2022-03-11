import { SeasonMemberAddScreen_OrganizationMemberPermitFragment } from '@/generated'

export type SeasonMemberAddRequest = {
    referee: boolean
    manager: boolean
    member: SeasonMemberAddScreen_OrganizationMemberPermitFragment
}

export type SeasonRole = 'referee' | 'manager'
