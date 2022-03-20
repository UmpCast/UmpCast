import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import { IconID } from '@/testing/testID'
import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import { Box, Icon } from 'native-base'
import { Pressable } from 'react-native'

type Props = StackScreenProps<
    AppRootStackParamList,
    AppRootStackRoute.SeasonStructure
>

export default function SeasonStructureRightHeader({
    route,
    navigation
}: Props) {
    const { seasonId: id } = route.params

    const onPress = () => {
        navigation.navigate(AppRootStackRoute.DivisionCreate, {
            seasonId: id
        })
    }

    return (
        <Box mr={4}>
            <Pressable onPress={onPress} testID={IconID.DIVISION_CREATE}>
                <Icon
                    as={AntDesign}
                    color="primary.2"
                    name="addusergroup"
                    size={6}
                />
            </Pressable>
        </Box>
    )
}
