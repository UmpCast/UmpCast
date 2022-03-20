import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Box, HStack, Icon, Text } from 'native-base'
import { Pressable } from 'react-native'

import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import { SeasonEditStructDivisionHeader_DivisionFragment } from '@/generated'
import { IconID } from '@/testing/testID'

type ScreenNavigationProp = NavigationProp<
    AppRootStackParamList,
    AppRootStackRoute.SeasonStructure
>

export default function SeasonEditStructDivisionHeader({
    division,
    onTitlePress
}: {
    division: SeasonEditStructDivisionHeader_DivisionFragment
    onTitlePress: () => void
}) {
    const navigation = useNavigation<ScreenNavigationProp>()

    return (
        <HStack alignItems="center" justifyContent="space-between">
            <Pressable onPress={onTitlePress}>
                <Pressable onPress={onTitlePress}>
                    <HStack alignItems="center" space={2}>
                        <Box testID={`${IconID.DIVISION_EDIT}:${division.id}`}>
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
                onPress={() => {
                    navigation.navigate(AppRootStackRoute.PositionCreate, {
                        divisionId: division.id
                    })
                }}
                testID={`${IconID.POSITION_CREATE}:${division.id}`}
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
