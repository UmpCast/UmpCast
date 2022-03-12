import { SeasonParticipantAddScreen_OrganizationMemberEdgeFragment } from '@/generated'

export type SeasonParticipantAddRequest = {
    referee: boolean
    manager: boolean
    member: SeasonParticipantAddScreen_OrganizationMemberEdgeFragment
}

export type SeasonRole = 'referee' | 'manager'
