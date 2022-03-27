import { NavigationProp, useNavigation } from '@react-navigation/native'

import {
    SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdgeFragment,
    SeasonRoleType
} from '@/generated'

import SeasonSettingsItem from './Item'
import SeasonSettingsItemGroup from './ItemGroup'
import SeasonSettingsItemGroupPressable from './ItemPressable'
import {
    AppRootStackParamList,
    AppRootStackRoute
} from '@/navigation/navigators/Root/Stack'

type AppRootStackNavigationProp = NavigationProp<AppRootStackParamList>

export interface SeasonSettingsViewerRolesItemGroupProps {
    participatingSeason: SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdgeFragment
}

export default function SeasonSettingsViewerRolesItemGroup({
    participatingSeason
}: SeasonSettingsViewerRolesItemGroupProps) {
    const { navigate } = useNavigation<AppRootStackNavigationProp>()
    const { node: season, permit } = participatingSeason

    const isReferee = permit.roles.includes(SeasonRoleType.Referee)
    const isManager = permit.roles.includes(SeasonRoleType.Manager)

    return (
        <SeasonSettingsItemGroup>
            {isReferee ? (
                <SeasonSettingsItemGroupPressable
                    onPress={() => {
                        navigate(AppRootStackRoute.SeasonAboutReferee, {
                            seasonId: season.id
                        })
                    }}
                >
                    <SeasonSettingsItem title="Referee" />
                </SeasonSettingsItemGroupPressable>
            ) : null}
            {isManager ? (
                <SeasonSettingsItemGroupPressable
                    onPress={() => () => {
                        navigate(AppRootStackRoute.SeasonAboutManager, {
                            seasonId: season.id
                        })
                    }}
                >
                    <SeasonSettingsItem title="Manager" />
                </SeasonSettingsItemGroupPressable>
            ) : null}
        </SeasonSettingsItemGroup>
    )
}
