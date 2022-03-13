import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import { Box, Icon } from 'native-base'
import { Pressable } from 'react-native'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.SeasonStructure
>

export default function SeasonStructureRightHeader({
    route,
    navigation
}: Props) {
    const { id } = route.params

    const onPress = () => {
        navigation.navigate(RootStackRoutes.DivisionCreate, {
            seasonId: id
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
