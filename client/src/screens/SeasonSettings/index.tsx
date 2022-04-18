import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Switch, VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import SettingsItem from '@/components/Settings/Item'
import SettingsItemGroup from '@/components/Settings/ItemGroup'
import SettingsItemIcon from '@/components/Settings/ItemIcon'
import SettingsSection from '@/components/Settings/Section'
import SeasonSettingsAboutCard from '@/features/Season/core/Settings/AboutCard'
import SeasonSettingsAboutEditButton from '@/features/Season/core/Settings/AboutEditButton'
import SeasonsSettingsViewerRolesItemGroup from '@/features/Season/core/Settings/ViewerRolesItemGroup'
import useSeasonViewerOrgRole from '@/features/Season/hooks/useOrgRole'
import { OrganizationRoleType, useSettingsScreenQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps = RootStackScreenProps<RootStackRoute.Settings>

export default function SeasonSettingsScreen() {
    const { navigate } = useNavigation<ScreenProps['navigation']>()
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useSettingsScreenQuery({
        variables: {
            seasonId
        }
    })

    const orgRole = useSeasonViewerOrgRole({ seasonId })

    return (
        <ScreenContainer>
            <VStack space={3}>
                <SettingsSection
                    rightHeader={
                        orgRole === OrganizationRoleType.Owner && (
                            <SeasonSettingsAboutEditButton
                                onPress={() => {
                                    navigate(RootStackRoute.SettingsProfile, {
                                        seasonIdSeasonProfile
                                    })
                                }}
                            />
                        )
                    }
                    title="ABOUT"
                >
                    {data?.season && (
                        <SeasonSettingsAboutCard season={data.season} />
                    )}
                </SettingsSection>
                <SettingsSection title="YOUR ROLES">
                    {data?.viewer?.season && (
                        <SeasonsSettingsViewerRolesItemGroup
                            navigate={navigate}
                            participatingSeason={data.viewer.season}
                        />
                    )}
                </SettingsSection>
                <SettingsSection caption="Archived seasons are read only">
                    <SettingsItemGroup>
                        <SettingsItem
                            icon={
                                <SettingsItemIcon as={Feather} name="archive" />
                            }
                            navigateIcon={false}
                            title="Archive"
                        >
                            <Switch />
                        </SettingsItem>
                    </SettingsItemGroup>
                </SettingsSection>
            </VStack>
        </ScreenContainer>
    )
}
