import { Checkbox, Box, HStack, Text, VStack } from 'native-base'

import UserItemName from '@/core/User/Item/Name'
import UserProfilePicture from '@/core/User/Profile/Picture'
import {
    SeasonMemberAddItem_SeasonMemberStatusFragment,
    SeasonPermission
} from '@/generated'

interface SeasonMemberAddItemProps {
    status: SeasonMemberAddItem_SeasonMemberStatusFragment
    pendingPermissions: SeasonPermission[]
    onToggle: (permission: SeasonPermission) => any
}

export default function SeasonMemberAddItem({
    status,
    pendingPermissions,
    onToggle
}: SeasonMemberAddItemProps) {
    const {
        permit: { user },
        added
    } = status

    const hasReferee = pendingPermissions.includes(SeasonPermission.Referee)
    const hasManager = pendingPermissions.includes(SeasonPermission.Manager)

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
                        {added || (
                            <HStack
                                alignSelf="stretch"
                                justifyContent="flex-end"
                                space={2}
                            >
                                <Checkbox
                                    isChecked={hasReferee}
                                    onChange={() =>
                                        onToggle(SeasonPermission.Referee)
                                    }
                                    value=""
                                >
                                    <Text ml={2}>Referee</Text>
                                </Checkbox>
                                <Checkbox
                                    isChecked={hasManager}
                                    onChange={() =>
                                        onToggle(SeasonPermission.Manager)
                                    }
                                    value=""
                                >
                                    <Text ml={2}>Manager</Text>
                                </Checkbox>
                            </HStack>
                        )}
                    </VStack>
                </HStack>
            </HStack>
        </Box>
    )
}
