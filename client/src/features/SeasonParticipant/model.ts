import {
    SeasonParticipantsAddScreen_OrganizationMemberEdgeFragment,
    SeasonRoleType
} from '@/generated'

export type SeasonParticipantAddRequest = {
    pendingRoles: Record<SeasonRoleType, boolean>
    member: SeasonParticipantsAddScreen_OrganizationMemberEdgeFragment
}
