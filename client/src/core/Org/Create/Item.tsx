import { AntDesign } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Icon } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

import { OrgInfoItemLayout } from '../Info/Item'

type ScreenNavigationProp = NavigationProp<RootStackParamList>

export default function OrgCreateItem() {
    const { navigate } = useNavigation<ScreenNavigationProp>()

    const onItemPress = () => {
        navigate(RootStackRoutes.OrgCreate)
    }

    return (
        <OrgInfoItemLayout
            onPress={onItemPress}
            source={<Icon as={AntDesign} color="indigo.500" name="plus" />}
            title="Create Organization"
        />
    )
}
