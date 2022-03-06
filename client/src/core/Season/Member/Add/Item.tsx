import UserItemName from '@/core/User/Item/Name'
import UserProfilePicture from '@/core/User/Profile/Picture'
import {
    SeasonMemberAddItem_SeasonMemberStatusFragment,
    SeasonPermission
} from '@/generated'
import { AntDesign, Feather } from '@expo/vector-icons'
import { Checkbox, Box, HStack, Text, VStack, Icon } from 'native-base'

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
        <Box px={4} py={2}>
            <HStack justifyContent="space-between" alignItems="center">
                <HStack alignItems="center" space={3}>
                    <UserProfilePicture size={45} user={user} />
                    <VStack space={0.5}>
                        <UserItemName user={user} color={fontColor} />
                        {added && (
                            <Text fontSize="xs" color={fontColor}>
                                Already a member
                            </Text>
                        )}
                        {added || (
                            <HStack
                                space={2}
                                justifyContent="flex-end"
                                alignSelf="stretch"
                            >
                                <Checkbox
                                    value=""
                                    isChecked={hasReferee}
                                    onChange={() =>
                                        onToggle(SeasonPermission.Referee)
                                    }
                                >
                                    <Text ml={2}>Referee</Text>
                                </Checkbox>
                                <Checkbox
                                    value=""
                                    isChecked={hasManager}
                                    onChange={() =>
                                        onToggle(SeasonPermission.Manager)
                                    }
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
