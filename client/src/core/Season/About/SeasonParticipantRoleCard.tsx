import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Divider, VStack } from 'native-base'

import {
    SeasonParticipantRoleCard_UserParticipatingSeasonEdgeFragment,
    SeasonRoleType
} from '@/generated'

import SeasonInfoCardBox from './SeasonInfoCardBox'
import SeasonParticipantRoleItem from './SeasonParticipantRoleItem'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

type RootStackNavigationProp = NavigationProp<RootStackParamList>

export interface SeasonParticipantRoleCardProps {
    participatingSeason: SeasonParticipantRoleCard_UserParticipatingSeasonEdgeFragment
}

export default function SeasonParticipantRoleCard({
    participatingSeason
}: SeasonParticipantRoleCardProps) {
    const { navigate } = useNavigation<RootStackNavigationProp>()
    const { node: season, permit } = participatingSeason

    const isReferee = permit.roles.includes(SeasonRoleType.Referee)
    const isManager = permit.roles.includes(SeasonRoleType.Manager)

    return (
        <SeasonInfoCardBox>
            <VStack>
                {isReferee && (
                    <SeasonParticipantRoleItem
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
                    <SeasonParticipantRoleItem
                        name="Manager"
                        onPress={() => () => {
                            navigate(RootStackRoutes.SeasonAboutManager, {
                                seasonId: season.id
                            })
                        }}
                    />
                )}
            </VStack>
        </SeasonInfoCardBox>
    )
}
