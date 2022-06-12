import SettingsItem from '@/components/Settings/Item'
import SettingsItemGroup from '@/components/Settings/ItemGroup'
import SettingsItemPressable from '@/components/Settings/ItemPressable'
import {
    SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdgeFragment,
    SeasonRoleType
} from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/types'

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
        <SettingsItemGroup>
            {isReferee ? (
                <SettingsItemPressable
                    onPress={() => {
                        navigate(RootStackRoute.SeasonMeReferee, {
                            seasonId: season.id
                        })
                    }}
                >
                    <SettingsItem title="Referee" />
                </SettingsItemPressable>
            ) : null}
            {isManager ? (
                <SettingsItemPressable
                    onPress={() => () => {
                        navigate(RootStackRoute.SeasonMeManager, {
                            seasonId: season.id
                        })
                    }}
                >
                    <SettingsItem title="Manager" />
                </SettingsItemPressable>
            ) : null}
        </SettingsItemGroup>
    )
}
