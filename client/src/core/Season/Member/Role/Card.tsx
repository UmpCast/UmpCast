import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Divider, VStack } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import SeasonAboutCard from '@/core/Season/About/Card'
import {
    SeasonMemberRoleCard_UserParticipatingSeasonEdgeFragment,
    SeasonRoleType
} from '@/generated'

import SeasonMemberRoleItem from './Item'

type RootStackNavigationProp = NavigationProp<RootStackParamList>

export interface SeasonMemberRoleCardProps {
    participatingSeason: SeasonMemberRoleCard_UserParticipatingSeasonEdgeFragment
}

export default function SeasonMemberRoleCard({
    participatingSeason
}: SeasonMemberRoleCardProps) {
    const { navigate } = useNavigation<RootStackNavigationProp>()
    const { node: season, permit } = participatingSeason

    const isReferee = permit.roles.includes(SeasonRoleType.Referee)
    const isManager = permit.roles.includes(SeasonRoleType.Manager)

    return (
        <SeasonAboutCard>
            <VStack>
                {isReferee && (
                    <SeasonMemberRoleItem
                        name="Referee"
                        onPress={() => {
                            navigate(RootStackRoutes.SeasonAboutReferee, {
                                seasonId: season.id
                            })
                        }}
                    />
                )}
                {isReferee && isManager && <Divider color="blueGray.400" />}
                {isManager && (
                    <SeasonMemberRoleItem
                        name="Manager"
                        onPress={() => () => {
                            navigate(RootStackRoutes.SeasonAboutManager, {
                                seasonId: season.id
                            })
                        }}
                    />
                )}
            </VStack>
        </SeasonAboutCard>
    )
}
