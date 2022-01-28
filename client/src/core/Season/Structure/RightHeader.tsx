import { Pressable } from 'react-native'
import { Box, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { RootStackParamList, RootStackRoutes } from '@/navigation'
import { StackScreenProps } from '@react-navigation/stack'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.SeasonStructure
>

export default function SeasonStructureRightHeader({
    route,
    navigation
}: Props) {
    const { seasonId } = route.params

    const onPress = () => {
        navigation.navigate(RootStackRoutes.DivisionCreate, {
            seasonId
        })
    }

    return (
        <Box mr={4}>
            <Pressable onPress={onPress} testID="create-division-button">
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
