import {
    SeasonParticipantAddScreen_OrganizationMemberEdgeFragment,
    SeasonRoleType
} from '@/generated'

export type SeasonParticipantAddRequest = {
    pendingRoles: Record<SeasonRoleType, boolean>
    member: SeasonParticipantAddScreen_OrganizationMemberEdgeFragment
}
