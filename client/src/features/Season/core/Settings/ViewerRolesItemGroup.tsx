import {
    SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdgeFragment,
    SeasonRoleType
} from '@/generated'

import SeasonSettingsItem from './Item'
import SeasonSettingsItemGroup from './ItemGroup'
import SeasonSettingsItemPressable from './ItemPressable'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'

export interface SeasonSettingsViewerRolesItemGroupProps {
    participatingSeason: SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdgeFragment
    navigate: RootStackScreenProps['navigation']['navigate']
}

export default function SeasonSettingsViewerRolesItemGroup({
    participatingSeason,
    navigate
}: SeasonSettingsViewerRolesItemGroupProps) {
    const { node: season, permit } = participatingSeason

    const isReferee = permit.roles.includes(SeasonRoleType.Referee)
    const isManager = permit.roles.includes(SeasonRoleType.Manager)

    return (
        <SeasonSettingsItemGroup>
            {isReferee ? (
                <SeasonSettingsItemPressable
                    onPress={() => {
                        navigate(RootStackRoute.SeasonMeReferee, {
                            seasonId: season.id
                        })
                    }}
                >
                    <SeasonSettingsItem title="Referee" />
                </SeasonSettingsItemPressable>
            ) : null}
            {isManager ? (
                <SeasonSettingsItemPressable
                    onPress={() => () => {
                        navigate(RootStackRoute.SeasonMeManager, {
                            seasonId: season.id
                        })
                    }}
                >
                    <SeasonSettingsItem title="Manager" />
                </SeasonSettingsItemPressable>
            ) : null}
        </SeasonSettingsItemGroup>
    )
}
