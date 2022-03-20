import { AntDesign } from '@expo/vector-icons'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box, VStack } from 'native-base'

import { useOrgSettingsScreenQuery } from '@/generated'

import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import OrgDeleteButton from '../Delete/OrgDeleteButton'
import OrgSettingsItem from './Item'
import OrgSettingsItemIcon from './ItemIcon'

type ScreenNavigationProp = NavigationProp<
    AppRootStackParamList,
    AppRootStackRoute.OrgSettings
>

type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.OrgSettings
>

export default function OrgSettingsScreen() {
    const { navigate, goBack } = useNavigation<ScreenNavigationProp>()
    const { params } = useRoute<ScreenRouteProp>()

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
