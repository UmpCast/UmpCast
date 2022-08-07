import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import { Box, Icon } from 'native-base'
import { Pressable } from 'react-native'

import {
    RootStackParamList,
    RootStackRoute
} from '@/mobile/navigation/navigators/Root/Stack'
import { buildID, IconID, TestID } from '@/testing/testID'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoute.SeasonStructure
>

export default function SeasonStructureRightHeader({
    route,
    navigation
}: Props) {
    const { seasonId: id } = route.params

    const onPress = () => {
        navigation.navigate(RootStackRoute.SeasonDivisionNew, {
            seasonId: id
        })
    }

    return (
        <Box mr={4}>
            <Pressable
                onPress={onPress}
                testID={buildID(TestID.ICON, IconID.DIVISION_CREATE)}
            >
                <Icon as={AntDesign} name="addusergroup" button={6} />
            </Pressable>
        </Box>
    )
}
