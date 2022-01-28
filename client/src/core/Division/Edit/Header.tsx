import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { HStack, Icon, Text } from 'native-base'
import { Pressable } from 'react-native'

import { RootStackParamList, RootStackRoutes } from '@/navigation'

import { DivisionEditSelection } from '../models'

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.SeasonStructure
>

export default function DivisionHeader({
    division,
    selectDivision
}: {
    division: DivisionEditSelection
    selectDivision: (division: DivisionEditSelection) => void
}) {
    const navigation = useNavigation<ScreenNavigationProp>()

    const onEditPress = () => {
        selectDivision(division)
    }

    const onPositionCreatePress = () => {
        navigation.navigate(RootStackRoutes.PositionCreate, {
            divisionId: division.id
        })
    }

    return (
        <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space={2}>
                <Pressable
                    onPress={onEditPress}
                    testID={`edit-icon-${division.id}`}
                >
                    <Icon
                        as={Ionicons}
                        color="primary.2"
                        name="create-outline"
                    />
                </Pressable>
                <Text bold color="secondary.3" fontSize="xl">
                    {division?.name}
                </Text>
            </HStack>
            <Pressable
                onPress={onPositionCreatePress}
                testID={`${division.id}-position-create-button`}
            >
                <Icon
                    as={Ionicons}
                    color="primary.2"
                    name="md-person-add-outline"
                />
            </Pressable>
        </HStack>
    )
}
