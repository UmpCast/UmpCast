import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Box, HStack, Icon, Text } from 'native-base'
import { Pressable } from 'react-native'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

import { DivisionEditSelection } from '../models'

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.SeasonStructure
>

export default function DivisionHeader({
    division,
    onTitlePress
}: {
    division: DivisionEditSelection
    onTitlePress: () => void
}) {
    const navigation = useNavigation<ScreenNavigationProp>()

    const onPositionCreatePress = () => {
        navigation.navigate(RootStackRoutes.PositionCreate, {
            divisionId: division.id
        })
    }

    return (
        <HStack alignItems="center" justifyContent="space-between">
            <Pressable onPress={onTitlePress}>
                <Pressable onPress={onTitlePress}>
                    <HStack alignItems="center" space={2}>
                        <Box testID={`edit-icon-${division.id}`}>
                            <Icon
                                as={Ionicons}
                                color="primary.2"
                                name="create-outline"
                            />
                        </Box>
                        <Text bold color="secondary.3" fontSize="xl">
                            {division?.name}
                        </Text>
                    </HStack>
                </Pressable>
            </Pressable>
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
