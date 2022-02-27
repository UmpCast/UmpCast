import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useOrgSettingsScreenQuery } from '@/generated'
import { AntDesign } from '@expo/vector-icons'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box, VStack } from 'native-base'
import OrgDeleteButton from '../Delete/Button'
import OrgSettingsList from './List'

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.OrgSettings
>

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.OrgSettings
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

    const onEditProfilePress = () => {
        navigate(RootStackRoutes.OrgEdit, { id: params.id })
    }

    return (
        <Box p={4}>
            <VStack space={4}>
                <OrgSettingsList.Item
                    onPress={onEditProfilePress}
                    icon={<OrgSettingsList.Icon as={AntDesign} name="edit" />}
                    title="Edit Profile"
                />
                <OrgDeleteButton org={data.organization} onDelete={goBack} />
            </VStack>
        </Box>
    )
}
