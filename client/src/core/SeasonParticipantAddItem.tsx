import { Checkbox, Box, HStack, Text, VStack } from 'native-base'

import { SeasonRoleType } from '@/generated'
import { SeasonParticipantAddRequest } from '@/models/SeasonParticipant'

import SeasonParticipantInfoItemName from './SeasonParticipantInfoItemName'
import UserProfilePicture from './UserProfilePicture'

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
        <Box px={4} py={2} testID={`${user.id}-AddItem`}>
            <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={3}>
                    <UserProfilePicture size={45} user={user} />
                    <VStack space={0.5}>
                        <SeasonParticipantInfoItemName
                            color={fontColor}
                            user={user}
                        />
                        {isParticipating && (
                            <Text color={fontColor} fontSize="xs">
                                Already a member
                            </Text>
                        )}
                    </VStack>
                </HStack>
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
        </Box>
    )
}
