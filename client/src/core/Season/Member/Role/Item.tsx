import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'
import { Pressable } from 'react-native'

export interface SeasonMemberRoleItemProps {
    onPress: () => any
    name: string
}

export default function SeasonMemberRoleItem({
    onPress,
    name
}: SeasonMemberRoleItemProps) {
    return (
        <Pressable onPress={onPress}>
            <HStack justifyContent="space-between">
                <Text>{name}</Text>
                <Icon as={AntDesign} name="right" />
            </HStack>
        </Pressable>
    )
}
