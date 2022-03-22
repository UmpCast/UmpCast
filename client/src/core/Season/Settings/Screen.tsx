import { useNavigation, useRoute } from '@react-navigation/native'
import { Switch, VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { AppRootStackRoute } from '@/core/App/Root/Stack'
import { OrganizationRoleType, useSeasonSettingsScreenQuery } from '@/generated'

import SeasonSettingsAboutCard from './AboutCard'
import SeasonSettingsViewerRolesCard from './ViewerRolesCard'
import useSeasonViewerOrgRole from '../Viewer/useOrgRole'
import { AppRootStackScreenProps } from '@/core/App/Navigation/ScreenProps'
import SeasonSettingsAboutEditButton from './AboutEditButton'
import SeasonSettingsScreenGroup from './ScreenGroup'
import SeasonSettingsSection from './Section'
import SeasonSettingsSectionItemIcon from './SectionItemIcon'
import { Feather } from '@expo/vector-icons'
import SeasonSettingsSectionItem from './SectionItem'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.SeasonSettings>

export default function SeasonSettingsScreen() {
    const { navigate } = useNavigation<ScreenProps['navigation']>()
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useSeasonSettingsScreenQuery({
        variables: {
            seasonId
        }
    })

    const orgRole = useSeasonViewerOrgRole({ seasonId })

    return (
        <ScreenContainer>
            <VStack space={3}>
                <SeasonSettingsScreenGroup
                    title="ABOUT"
                    rightHeader={
                        orgRole === OrganizationRoleType.Owner && (
                            <SeasonSettingsAboutEditButton
                                onPress={() => {
                                    navigate(AppRootStackRoute.SeasonEdit, {
                                        seasonId
                                    })
                                }}
                            />
                        )
                    }
                >
                    {data?.season && (
                        <SeasonSettingsAboutCard season={data.season} />
                    )}
                </SeasonSettingsScreenGroup>
                <SeasonSettingsScreenGroup title="YOUR ROLES">
                    {data?.viewer?.season && (
                        <SeasonSettingsViewerRolesCard
                            participatingSeason={data.viewer.season}
                        />
                    )}
                </SeasonSettingsScreenGroup>
                <SeasonSettingsScreenGroup caption="Archived seasons are read only">
                    <SeasonSettingsSection>
                        <SeasonSettingsSectionItem
                            title="Archive"
                            icon={
                                <SeasonSettingsSectionItemIcon
                                    as={Feather}
                                    name="archive"
                                />
                            }
                            navigateIcon={false}
                        >
                            <Switch />
                        </SeasonSettingsSectionItem>
                    </SeasonSettingsSection>
                </SeasonSettingsScreenGroup>
            </VStack>
        </ScreenContainer>
    )
}
