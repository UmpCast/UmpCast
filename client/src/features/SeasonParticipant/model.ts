import {
    SeasonParticipantsAddScreen_OrganizationMemberEdgeFragment,
    SeasonRoleType
} from '@/graphql/generated'

export type SeasonParticipantAddRequest = {
    pendingRoles: Record<SeasonRoleType, boolean>
    member: SeasonParticipantsAddScreen_OrganizationMemberEdgeFragment
}
