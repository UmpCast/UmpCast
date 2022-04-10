import { AntDesign } from '@expo/vector-icons'
import { Box, VStack } from 'native-base'

import OrgDeleteButton from '@/features/Org/core/Delete/Button'
import OrgSettingsItem from '@/features/Org/core/Settings/Item'
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
                <OrgSettingsItem
                    icon={<OrgSettingsItemIcon as={AntDesign} name="edit" />}
                    onPress={() => {
                        navigate(RootStackRoute.OrganizationSettingsProfile, {
                            orgId
                        })
                    }}
                    title="Edit Profile"
                />
                <OrgDeleteButton onDelete={goBack} org={data.organization} />
            </VStack>
        </Box>
    )
}
