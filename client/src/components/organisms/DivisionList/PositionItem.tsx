import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

export default function PositionItem({
    position
}: {
    position: { id: string; name?: string | null }
}) {
    return (
        <HStack justifyContent="space-between" key={position.id}>
            <HStack alignItems="center" space={4} pl={4}>
                <Icon as={Ionicons} color="secondary.2" name="person-outline" />
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
    )
}
