import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { SeasonMemberRoleCard_SeasonFragment } from '@/generated'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Box, Divider, VStack } from 'native-base'
import SeasonAboutCard from '../../About/Card'
import SeasonMemberRoleItem from './Item'

type RootStackNavigationProp = NavigationProp<RootStackParamList>

export interface SeasonMemberRoleCardProps {
    season: SeasonMemberRoleCard_SeasonFragment
}

export default function SeasonMemberRoleCard({
    season
}: SeasonMemberRoleCardProps) {
    const { navigate } = useNavigation<RootStackNavigationProp>()

    const { id, viewerPermit } = season
    if (!viewerPermit) return null

    const { referee, manager } = viewerPermit

    return (
        <SeasonAboutCard>
            <VStack>
                {referee.assigned && (
                    <SeasonMemberRoleItem
                        onPress={() => {
                            navigate(RootStackRoutes.SeasonAboutReferee, {
                                seasonId: id
                            })
                        }}
                        name="Referee"
                    />
                )}
                {referee.assigned && manager.assigned && (
                    <Divider color="blueGray.400" />
                )}
                {manager.assigned && (
                    <SeasonMemberRoleItem
                        onPress={() => () => {
                            navigate(RootStackRoutes.SeasonAboutManager, {
                                seasonId: id
                            })
                        }}
                        name="Manager"
                    />
                )}
            </VStack>
        </SeasonAboutCard>
    )
}
