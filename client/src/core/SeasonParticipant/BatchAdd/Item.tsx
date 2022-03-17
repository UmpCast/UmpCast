import { Checkbox, Box, HStack, Text, VStack } from 'native-base'

import { SeasonRoleType } from '@/generated'
import { SeasonParticipantAddRequest } from '@/core/SeasonParticipant/model'
import SeasonParticipantItemName from '../Item/Name'
import SeasonParticipantItemPressable from '../Item/Pressable'

interface SeasonParticipantAddItemProps {
    request: SeasonParticipantAddRequest
    onToggle: (role: SeasonRoleType) => any
}

export default function SeasonParticipantAddItem({
    request,
    onToggle
}: SeasonParticipantAddItemProps) {
    const {
        member: { node: user, isParticipating },
        pendingRoles: roles
    } = request

    const fontColor = isParticipating ? 'blueGray.400' : undefined

    return (
        <SeasonParticipantItemPressable user={user}>
            <HStack justifyContent="space-between" alignItems="center">
                <VStack space={0.5}>
                    <SeasonParticipantItemName color={fontColor} user={user} />
                    {isParticipating && (
                        <Text color={fontColor} fontSize="xs">
                            Already a member
                        </Text>
                    )}
                </VStack>
                {isParticipating || (
                    <HStack space={2}>
                        <Checkbox
                            isChecked={roles.REFEREE}
                            onChange={() => onToggle(SeasonRoleType.Referee)}
                            value=""
                        >
                            <Text color="blueGray.400" ml={2}>
                                Referee
                            </Text>
                        </Checkbox>
                        <Checkbox
                            isChecked={roles.MANAGER}
                            onChange={() => onToggle(SeasonRoleType.Manager)}
                            value=""
                        >
                            <Text color="blueGray.400" ml={2}>
                                Manager
                            </Text>
                        </Checkbox>
                    </HStack>
                )}
            </HStack>
        </SeasonParticipantItemPressable>
    )
}
