import { useNavigation, useRoute } from '@react-navigation/native'
import { Switch, VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { OrganizationRoleType, useSeasonSettingsScreenQuery } from '@/generated'

import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import SeasonSettingsAboutCard from '@/features/Season/core/Settings/AboutCard'
import SeasonSettingsAboutEditButton from '@/features/Season/core/Settings/AboutEditButton'
import SeasonSettingsSection from '@/features/Season/core/Settings/Section'
import SeasonSettingsItemGroup from '@/features/Season/core/Settings/ItemGroup'
import SeasonSettingsItem from '@/features/Season/core/Settings/Item'
import SeasonSettingsItemIcon from '@/features/Season/core/Settings/ItemIcon'
import SeasonSettingsViewerRolesItemGroup from '@/features/Season/core/Settings/ViewerRolesItemGroup'
import useSeasonViewerOrgRole from '@/features/Season/hooks/useOrgRole'
import { Feather } from '@expo/vector-icons'

type ScreenProps = RootStackScreenProps<RootStackRoute.SeasonSettings>

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
                <SeasonSettingsSection
                    title="ABOUT"
                    rightHeader={
                        orgRole === OrganizationRoleType.Owner && (
                            <SeasonSettingsAboutEditButton
                                onPress={() => {
                                    navigate(
                                        RootStackRoute.SeasonSettingsProfile,
                                        {
                                            seasonId
                                        }
                                    )
                                }}
                            />
                        )
                    }
                >
                    {data?.season && (
                        <SeasonSettingsAboutCard season={data.season} />
                    )}
                </SeasonSettingsSection>
                <SeasonSettingsSection title="YOUR ROLES">
                    {data?.viewer?.season && (
                        <SeasonSettingsViewerRolesItemGroup
                            participatingSeason={data.viewer.season}
                            navigate={navigate}
                        />
                    )}
                </SeasonSettingsSection>
                <SeasonSettingsSection caption="Archived seasons are read only">
                    <SeasonSettingsItemGroup>
                        <SeasonSettingsItem
                            title="Archive"
                            icon={
                                <SeasonSettingsItemIcon
                                    as={Feather}
                                    name="archive"
                                />
                            }
                            navigateIcon={false}
                        >
                            <Switch />
                        </SeasonSettingsItem>
                    </SeasonSettingsItemGroup>
                </SeasonSettingsSection>
            </VStack>
        </ScreenContainer>
    )
}
