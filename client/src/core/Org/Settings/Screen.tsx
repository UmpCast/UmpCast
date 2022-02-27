import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { AntDesign } from '@expo/vector-icons'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'
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
    const { navigate } = useNavigation<ScreenNavigationProp>()
    const { params } = useRoute<ScreenRouteProp>()

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
                <Button variant="subtle" size="sm" colorScheme="indigo">
                    Delete Organization
                </Button>
            </VStack>
        </Box>
    )
}
