import { useSeasonOrgRoleQuery } from '@/generated'

export interface SeasonOrgRoleOptions {
    seasonId: string
}

export default function useSeasonOrgRole({ seasonId }: SeasonOrgRoleOptions) {
    const [{ data }] = useSeasonOrgRoleQuery({
        variables: { seasonId }
    })

    return data?.viewer?.season?.permit.membership.role
}
