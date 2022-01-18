import { Ionicons } from '@expo/vector-icons'
import { Text, HStack, Icon } from 'native-base'
import React, { useContext } from 'react'
import { Pressable } from 'react-native'
import { StructContext } from '.'

export default function DivisionHeader({
    division
}: {
    division: { id: string; name?: string | null }
}) {
    const [_, send] = useContext(StructContext)
    return (
        <HStack justifyContent="space-between" alignItems="center">
            <HStack space={2} alignItems="center">
                <Pressable
                    onPress={() =>
                        send({
                            type: 'EDIT',
                            edit: {
                                id: division.id,
                                typeName: 'division',
                                name: division.name ?? 'N/A'
                            }
                        })
                    }
                >
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
