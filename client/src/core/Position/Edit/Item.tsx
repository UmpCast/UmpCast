import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, Pressable, Text } from 'native-base'

export default function PositionEditItem({
    position,
    onPress
}: {
    position: { id: string; name?: string | null }
    onPress: () => void
}) {
    return (
        <Pressable
            onPress={onPress}
            _hover={{ bg: 'blueGray.100' }}
            borderRadius={5}
        >
            <HStack
                key={position.id}
                py={1}
                justifyContent="space-between"
                alignItems="center"
            >
                <HStack alignItems="center" pl={4} space={4}>
                    <Icon
                        as={Ionicons}
                        color="secondary.2"
                        name="person-outline"
                    />
                    <Text color="secondary.2" fontSize="lg">
                        {position.name}
                    </Text>
                </HStack>
                <Icon
                    as={Ionicons}
                    color="secondary.2"
                    name="md-ellipsis-vertical"
                    size={5}
                />
            </HStack>
        </Pressable>
    )
}
