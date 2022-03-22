import { Checkbox, HStack, Text, VStack } from 'native-base'

import { SeasonParticipantAddRequest } from '@/core/SeasonParticipant/model'
import { SeasonRoleType } from '@/generated'
import { buildID, TestID } from '@/testing/testID'

import SeasonParticipantItemName from '../components/ItemName'
import SeasonParticipantItemPressable from '../components/ItemPressable'

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
        <SeasonParticipantItemPressable
            testID={buildID(TestID.CORE, 'SeasonParticipantAddItem', user.id)}
            user={user}
        >
            <HStack alignItems="center" justifyContent="space-between">
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
