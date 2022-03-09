import { SeasonMemberRoleCard_SeasonFragment } from '@/generated'
import SeasonAboutCard from '../../About/Card'
import SeasonMemberRoleItem from './Item'

export interface SeasonMemberRoleCardProps {
    season: SeasonMemberRoleCard_SeasonFragment
}
export default function SeasonMemberRoleCard({
    season
}: SeasonMemberRoleCardProps) {
    const { viewerPermit } = season
    if (!viewerPermit) return null

    const { referee, manager } = viewerPermit

    return (
        <SeasonAboutCard>
            {referee.assigned && (
                <SeasonMemberRoleItem onPress={() => {}} name="Referee" />
            )}
            {manager.assigned && (
                <SeasonMemberRoleItem onPress={() => {}} name="Manager" />
            )}
        </SeasonAboutCard>
    )
}
