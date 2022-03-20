import { useSeasonViewerOrgRoleQuery } from '@/generated'

export interface SeasonViewerOrgRoleOptions {
    seasonId: string
}

export default function useSeasonViewerOrgRole({
    seasonId
}: SeasonViewerOrgRoleOptions) {
    const [{ data }] = useSeasonViewerOrgRoleQuery({
        variables: {
            seasonId
        }
    })

    return data?.viewer?.season?.permit.membership.role
}
