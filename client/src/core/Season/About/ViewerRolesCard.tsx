import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Divider, VStack } from 'native-base'

import {
    SeasonAboutViewerRolesCard_UserParticipatingSeasonEdgeFragment,
    SeasonRoleType
} from '@/generated'

import SeasonInfoCardBox from './CardBox'
import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import SeasonAboutViewerRoleItem from './ViewerRoleItem'

type AppRootStackNavigationProp = NavigationProp<AppRootStackParamList>

export interface SeasonAboutViewerRolesCardProps {
    participatingSeason: SeasonAboutViewerRolesCard_UserParticipatingSeasonEdgeFragment
}

export default function SeasonAboutViewerRolesCard({
    participatingSeason
}: SeasonAboutViewerRolesCardProps) {
    const { navigate } = useNavigation<AppRootStackNavigationProp>()
    const { node: season, permit } = participatingSeason

    const isReferee = permit.roles.includes(SeasonRoleType.Referee)
    const isManager = permit.roles.includes(SeasonRoleType.Manager)

    return (
        <SeasonInfoCardBox>
            <VStack>
                {isReferee && (
                    <SeasonAboutViewerRoleItem
                        name="Referee"
                        onPress={() => {
                            navigate(AppRootStackRoute.SeasonAboutReferee, {
                                seasonId: season.id
                            })
                        }}
                    />
                )}
                {isReferee && isManager && <Divider color="blueGray.400" />}
                {isManager && (
                    <SeasonAboutViewerRoleItem
                        name="Manager"
                        onPress={() => () => {
                            navigate(AppRootStackRoute.SeasonAboutManager, {
                                seasonId: season.id
                            })
                        }}
                    />
                )}
            </VStack>
        </SeasonInfoCardBox>
    )
}
