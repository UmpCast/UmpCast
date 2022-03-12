import { UseSeasonMemberOrgRole_QueryFragment } from '@/generated'

export function useSeasonMemberOrgRole(
    query?: UseSeasonMemberOrgRole_QueryFragment
) {
    return query?.viewer?.season?.permit.membership.role
}
