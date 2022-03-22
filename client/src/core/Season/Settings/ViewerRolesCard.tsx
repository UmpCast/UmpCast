import { NavigationProp, useNavigation } from '@react-navigation/native'

import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import {
    SeasonSettingsViewerRolesCard_UserParticipatingSeasonEdgeFragment,
    SeasonRoleType
} from '@/generated'

import SeasonSettingsSectionItem from './SectionItem'
import SeasonSettingsSection from './Section'
import SeasonSettingsSectionPressable from './SectionPressable'

type AppRootStackNavigationProp = NavigationProp<AppRootStackParamList>

export interface SeasonSettingsViewerRolesCardProps {
    participatingSeason: SeasonSettingsViewerRolesCard_UserParticipatingSeasonEdgeFragment
}

export default function SeasonSettingsViewerRolesCard({
    participatingSeason
}: SeasonSettingsViewerRolesCardProps) {
    const { navigate } = useNavigation<AppRootStackNavigationProp>()
    const { node: season, permit } = participatingSeason

    const isReferee = permit.roles.includes(SeasonRoleType.Referee)
    const isManager = permit.roles.includes(SeasonRoleType.Manager)

    return (
        <SeasonSettingsSection>
            {isReferee ? (
                <SeasonSettingsSectionPressable
                    onPress={() => {
                        navigate(AppRootStackRoute.SeasonAboutReferee, {
                            seasonId: season.id
                        })
                    }}
                >
                    <SeasonSettingsSectionItem title="Referee" />
                </SeasonSettingsSectionPressable>
            ) : null}
            {isManager ? (
                <SeasonSettingsSectionPressable
                    onPress={() => () => {
                        navigate(AppRootStackRoute.SeasonAboutManager, {
                            seasonId: season.id
                        })
                    }}
                >
                    <SeasonSettingsSectionItem title="Manager" />
                </SeasonSettingsSectionPressable>
            ) : null}
        </SeasonSettingsSection>
    )
}
