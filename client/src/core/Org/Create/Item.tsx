import { OrgInfoItemLayout } from '../Info/Item'
import { Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { NavigationProp, useNavigation } from '@react-navigation/native'

type ScreenNavigationProp = NavigationProp<RootStackParamList>

export default function OrgCreateItem() {
    const { navigate } = useNavigation<ScreenNavigationProp>()

    const onItemPress = () => {
        navigate(RootStackRoutes.OrgCreate)
    }

    return (
        <OrgInfoItemLayout
            source={<Icon as={AntDesign} name="plus" color="indigo.500" />}
            title="Create Organization"
            onPress={onItemPress}
        />
    )
}
