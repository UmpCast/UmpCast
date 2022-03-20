import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, Pressable, Text } from 'native-base'

import { SeasonEditStructPositionItem_PositionFragment } from '@/generated'

export default function SeasonEditStructPositionItem({
    position,
    onPress
}: {
    position: SeasonEditStructPositionItem_PositionFragment
    onPress: () => void
}) {
    return (
        <Pressable
            _hover={{ bg: 'blueGray.100' }}
            borderRadius={5}
            onPress={onPress}
        >
            <HStack
                key={position.id}
                alignItems="center"
                justifyContent="space-between"
                py={1}
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
