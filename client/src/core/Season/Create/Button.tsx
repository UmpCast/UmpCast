import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { Button, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { SeasonCreateButton_OrganizationFragment } from '@/generated'

type StackNavigationProp = NavigationProp<RootStackParamList>

export interface SeasonCreateButtonProp {
    org: SeasonCreateButton_OrganizationFragment
}

export default function SeasonCreateButton({ org }: SeasonCreateButtonProp) {
    const { navigate } = useNavigation<StackNavigationProp>()

    return (
        <Button
            size="sm"
            colorScheme="blueGray"
            variant="ghost"
            borderRadius={100}
            onPress={() => {
                navigate(RootStackRoutes.SeasonCreate, {
                    orgId: org.id
                })
            }}
            testID="season-create-button"
        >
            <Icon as={AntDesign} name="plus" color="indigo.500" />
        </Button>
    )
}
