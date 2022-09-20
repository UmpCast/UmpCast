import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, HStack, Icon, Text } from 'native-base'
import { Pressable } from 'react-native'

import { SeasonEditStructDivisionHeader_DivisionFragment } from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { buildID, TestID, IconID } from '@/testing/testID'

type ScreenProps = RootStackScreenProps<RootStackRoute.SeasonStructure>

export default function SeasonEditStructDivisionHeader({
    division,
    onTitlePress
}: {
    division: SeasonEditStructDivisionHeader_DivisionFragment
    onTitlePress: () => void
}) {
    const navigation = useNavigation<ScreenProps['navigation']>()

    return (
        <HStack alignItems="center" justifyContent="space-between">
            <Pressable onPress={onTitlePress}>
                <Pressable onPress={onTitlePress}>
                    <HStack alignItems="center" space={2}>
                        <Box testID={buildID(TestID.ICON, IconID.DIVISION_EDIT, division.id)}>
                            <Icon as={Ionicons} name="create-outline" />
                        </Box>
                        <Text bold color="secondary.3" fontSize="xl">
                            {division?.name}
                        </Text>
                    </HStack>
                </Pressable>
            </Pressable>
            <Pressable
                onPress={() => {
                    navigation.navigate(RootStackRoute.DivisionPositionNew, {
                        divisionId: division.id
                    })
                }}
                testID={buildID(TestID.ICON, IconID.POSITION_CREATE, division.id)}
            >
                <Icon as={Ionicons} name="md-person-add-outline" />
            </Pressable>
        </HStack>
    )
}
