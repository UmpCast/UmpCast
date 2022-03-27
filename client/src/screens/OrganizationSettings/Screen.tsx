import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, VStack } from 'native-base'

import { useOrgSettingsScreenQuery } from '@/generated'

import OrgDeleteButton from '../Delete/Button'

import OrgSettingsItem from './Item'
import OrgSettingsItemIcon from './ItemIcon'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'
import { AppRootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.OrgSettings>

export default function OrgSettingsScreen() {
    const { navigate, goBack } = useNavigation<ScreenProps['navigation']>()
    const { params } = useRoute<ScreenProps['route']>()

    const [{ data }] = useOrgSettingsScreenQuery({
        variables: {
            id: params.id
        }
    })

    if (!data?.organization) return null

    return (
        <Box p={4}>
            <VStack space={4}>
                <OrgSettingsItem
                    icon={<OrgSettingsItemIcon as={AntDesign} name="edit" />}
                    onPress={() => {
                        navigate(AppRootStackRoute.OrgEdit, { id: params.id })
                    }}
                    title="Edit Profile"
                />
                <OrgDeleteButton onDelete={goBack} org={data.organization} />
            </VStack>
        </Box>
    )
}
