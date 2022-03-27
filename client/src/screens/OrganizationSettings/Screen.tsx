import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, VStack } from 'native-base'

import { useOrgSettingsScreenQuery } from '@/generated'

import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import OrgDeleteButton from '@/features/Org/core/Delete/Button'
import OrgSettingsItem from '@/features/Org/core/Settings/Item'
import OrgSettingsItemIcon from '@/features/Org/core/Settings/ItemIcon'

type ScreenProps = RootStackScreenProps<RootStackRoute.OrganizationSettings>

export default function OrgSettingsScreen() {
    const { navigate, goBack } = useNavigation<ScreenProps['navigation']>()
    const {
        params: { orgId }
    } = useRoute<ScreenProps['route']>()

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
                OrganizationSettingsProfile
                <OrgDeleteButton onDelete={goBack} org={data.organization} />
            </VStack>
        </Box>
    )
}
