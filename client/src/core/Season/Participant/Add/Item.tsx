import { Checkbox, Box, HStack, Text, VStack } from 'native-base'

import UserProfilePicture from '@/core/User/Profile/Picture'

import { SeasonParticipantAddRequest, SeasonRole } from '../model'
import SeasonParticipantInfoItemName from '../Info/ItemName'

interface SeasonParticipantAddItemProps {
    request: SeasonParticipantAddRequest
    onToggle: (role: SeasonRole) => any
}

export default function SeasonParticipantAddItem({
    request,
    onToggle
}: SeasonParticipantAddItemProps) {
    const {
        member: { node: user, isParticipating }
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
                            isChecked={request.referee}
                            onChange={() => onToggle('referee')}
                            value=""
                        >
                            <Text color="blueGray.400" ml={2}>
                                Referee
                            </Text>
                        </Checkbox>
                        <Checkbox
                            isChecked={request.manager}
                            onChange={() => onToggle('manager')}
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
