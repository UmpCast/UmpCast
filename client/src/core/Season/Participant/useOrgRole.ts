import { UseSeasonParticipantOrgRole_QueryFragment } from '@/generated'

export function useSeasonParticipantOrgRole(
    query?: UseSeasonParticipantOrgRole_QueryFragment
) {
    return query?.viewer?.season?.permit.membership.role
}
