import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

export interface PositionItemProps {
    positionName?: string | null
}

export default function PositionItem({ positionName }: PositionItemProps) {
    return (
        <HStack justifyContent="space-between">
            <HStack alignItems="center" space={4} pl={4}>
                <Icon as={Ionicons} color="secondary.2" name="person-outline" />
                <Text color="secondary.2" fontSize="lg">
                    {positionName}
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
