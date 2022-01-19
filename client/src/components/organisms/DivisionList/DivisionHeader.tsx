import { EditStructService } from '@/machines/editStructMachine'
import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'
import { Pressable } from 'react-native'

export default function DivisionHeader({
    editStructService,
    division
}: {
    editStructService: EditStructService
    division: { id: string; name?: string | null }
}) {
    const onStartEdit = () =>
        editStructService.send({
            type: 'START',
            selected: {
                type: 'division',
                id: division.id,
                name: division.name ?? ''
            }
        })

    return (
        <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space={2}>
                <Pressable onPress={onStartEdit}>
                    <Icon
                        as={Ionicons}
                        color="primary.2"
                        name="create-outline"
                        testID={`division-edit-icon-${division.id}`}
                    />
                </Pressable>
                <Text bold color="secondary.3" fontSize="xl">
                    {division?.name}
                </Text>
            </HStack>
            <Pressable onPress={() => onPositionAdd(division.id)}>
                <Icon
                    as={Ionicons}
                    color="primary.2"
                    name="md-person-add-outline"
                    testID={`division-add-icon-${division.id}`}
                />
            </Pressable>
        </HStack>
    )
}
