import { Checkbox, Box, HStack, Text, VStack } from 'native-base'

import UserItemName from '@/core/User/Item/Name'
import UserProfilePicture from '@/core/User/Profile/Picture'
import { SeasonPermission } from '@/generated'

import { SeasonMemberAddRequest } from '../model'

interface SeasonMemberAddItemProps {
    request: SeasonMemberAddRequest
    onToggle: (permission: SeasonPermission) => any
}

export default function SeasonMemberAddItem({
    request,
    onToggle
}: SeasonMemberAddItemProps) {
    const {
        permit: { user },
        added
    } = request.status

    const fontColor = added ? 'blueGray.400' : undefined

    return (
        <Box px={4} py={2} testID={`${user.id}-AddItem`}>
            <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={3}>
                    <UserProfilePicture size={45} user={user} />
                    <VStack space={0.5}>
                        <UserItemName color={fontColor} user={user} />
                        {added && (
                            <Text color={fontColor} fontSize="xs">
                                Already a member
                            </Text>
                        )}
                    </VStack>
                </HStack>
                {added || (
                    <HStack space={2}>
                        <Checkbox
                            isChecked={request[SeasonPermission.Referee]}
                            onChange={() => onToggle(SeasonPermission.Referee)}
                            value=""
                        >
                            <Text ml={2} color="blueGray.400">
                                Referee
                            </Text>
                        </Checkbox>
                        <Checkbox
                            isChecked={request[SeasonPermission.Manager]}
                            onChange={() => onToggle(SeasonPermission.Manager)}
                            value=""
                        >
                            <Text ml={2} color="blueGray.400">
                                Manager
                            </Text>
                        </Checkbox>
                    </HStack>
                )}
            </HStack>
        </Box>
    )
}
