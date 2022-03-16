import { AntDesign } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Button, Icon } from 'native-base'

import {
    RootStackParamList,
    RootStackRoutes
} from '../../App/Root/AppRootStack'

type StackNavigationProp = NavigationProp<RootStackParamList>

export interface SeasonCreateButtonProp {
    orgId: string
}

export default function SeasonCreateButton({ orgId }: SeasonCreateButtonProp) {
    const { navigate } = useNavigation<StackNavigationProp>()

    return (
        <Button
            borderRadius={100}
            colorScheme="blueGray"
            onPress={() => {
                navigate(RootStackRoutes.SeasonCreate, {
                    orgId
                })
            }}
            size="sm"
            testID="season-create-button"
            variant="ghost"
        >
            <Icon as={AntDesign} color="indigo.500" name="plus" />
        </Button>
    )
}
