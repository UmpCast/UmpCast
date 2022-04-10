import { AntDesign } from '@expo/vector-icons'
import { Box, VStack } from 'native-base'

import OrgDeleteButton from '@/features/Org/core/Delete/Button'
import OrgSettingsItemIcon from '@/features/Org/core/Settings/ItemIcon'
import { useOrgSettingsScreenQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import SettingsItem from '@/components/Settings/Item'
import SettingsItemPressable from '@/components/Settings/ItemPressable'
import SettingsItemGroup from '@/components/Settings/ItemGroup'

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
                                <OrgSettingsItemIcon
                                    as={AntDesign}
                                    name="edit"
                                />
                            }
                            title="View profile"
                        />
                    </SettingsItemPressable>
                </SettingsItemGroup>
                <OrgDeleteButton onDelete={goBack} org={data.organization} />
            </VStack>
        </Box>
    )
}
