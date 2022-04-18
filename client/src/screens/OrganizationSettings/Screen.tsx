import { Feather } from '@expo/vector-icons'
import { Box, VStack } from 'native-base'

import SettingsItem from '@/components/Settings/Item'
import SettingsItemGroup from '@/components/Settings/ItemGroup'
import SettingsItemPressable from '@/components/Settings/ItemPressable'
import OrgDeleteButton from '@/features/Org/core/Delete/Button'
import OrgSettingsItemIcon from '@/features/Org/core/Settings/ItemIcon'
import { useOrgSettingsScreenQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps = RootStackScreenProps<RootStackRoute.OrganizationSettings>

export default function OrgSettingsScreen({ navigation, route }: ScreenProps) {
    const { navigate, goBack } = navigation
    const {
        params: { orgId }
    } = route

    const [{ data }] = useOrgSettingsScreenQuery({
        variables: {
            id: orgId
        }
    })

    if (!data?.organization) return null

    return (
        <Box p={4}>
            <VStack space={4}>
                <SettingsItemGroup>
                    <SettingsItemPressable
                        onPress={() => {
                            navigate(
                                RootStackRoute.OrganizationSettingsProfile,
                                {
                                    orgId
                                }
                            )
                        }}
                    >
                        <SettingsItem
                            icon={
                                <OrgSettingsItemIcon as={Feather} name="user" />
                            }
                            title="Profile"
                        />
                    </SettingsItemPressable>
                </SettingsItemGroup>
                <OrgDeleteButton onDelete={goBack} org={data.organization} />
            </VStack>
        </Box>
    )
}
