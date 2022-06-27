import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Switch, VStack } from 'native-base'

import ScreenContainer from '@/blocks/Screen/Container'
import SettingsItem from '@/blocks/Settings/Item'
import SettingsItemGroup from '@/blocks/Settings/ItemGroup'
import SettingsItemIcon from '@/blocks/Settings/ItemIcon'
import SettingsSection from '@/blocks/Settings/Section'
import SeasonSettingsAboutCard from '@/features/Season/core/Settings/AboutCard'
import SeasonSettingsAboutEditButton from '@/features/Season/core/Settings/AboutEditButton'
import SeasonsSettingsViewerRolesItemGroup from '@/features/Season/core/Settings/ViewerRolesItemGroup'
import useSeasonViewerOrgRole from '@/features/Season/hooks/useOrgRole'
import { OrganizationRoleType, useSettingsScreenQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/types'

type ScreenProps = RootStackScreenProps<RootStackRoute.SeasonSettings>

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
                                    navigate(RootStackRoute.SeasonProfile, {
                                        seasonId
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
