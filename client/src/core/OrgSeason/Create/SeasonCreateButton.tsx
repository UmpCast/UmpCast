import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import { AntDesign } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Button, Icon } from 'native-base'

type StackNavigationProp = NavigationProp<AppRootStackParamList>

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
                navigate(AppRootStackRoute.SeasonCreate, {
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
