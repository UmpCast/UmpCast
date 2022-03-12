import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Divider, VStack } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import SeasonAboutCard from '@/core/Season/About/Card'
import {
    SeasonMemberRoleCard_SeasonParticipantFragment,
    SeasonRoleType
} from '@/generated'

import SeasonMemberRoleItem from './Item'

type RootStackNavigationProp = NavigationProp<RootStackParamList>

export interface SeasonMemberRoleCardProps {
    participant: SeasonMemberRoleCard_SeasonParticipantFragment
}

export default function SeasonMemberRoleCard({
    participant
}: SeasonMemberRoleCardProps) {
    const { navigate } = useNavigation<RootStackNavigationProp>()
    const { season, roles } = participant

    const isReferee = roles.includes(SeasonRoleType.Referee)
    const isManager = roles.includes(SeasonRoleType.Manager)

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
