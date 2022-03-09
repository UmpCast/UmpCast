import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text, Pressable } from 'native-base'

export interface SeasonMemberRoleItemProps {
    onPress: () => any
    name: string
}

export default function SeasonMemberRoleItem({
    onPress,
    name
}: SeasonMemberRoleItemProps) {
    return (
        <Pressable
            onPress={onPress}
            _hover={{ backgroundColor: 'blueGray.200' }}
            _pressed={{ backgroundColor: 'blueGray.300' }}
            py={3}
            px={4}
            borderRadius={5}
        >
            <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="md" fontWeight="medium">
                    {name}
                </Text>
                <Icon as={AntDesign} name="right" color="indigo.500" size={4} />
            </HStack>
        </Pressable>
    )
}
