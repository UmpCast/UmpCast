import { SeasonMemberRoleCard_SeasonFragment } from '@/generated'
import { Box, Divider, VStack } from 'native-base'
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
            <VStack>
                {referee.assigned && (
                    <SeasonMemberRoleItem onPress={() => {}} name="Referee" />
                )}
                {referee.assigned && manager.assigned && (
                    <Divider color="blueGray.400" />
                )}
                {manager.assigned && (
                    <SeasonMemberRoleItem onPress={() => {}} name="Manager" />
                )}
            </VStack>
        </SeasonAboutCard>
    )
}
