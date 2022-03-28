import { Flex, HStack, IPressableProps, Pressable } from 'native-base'

import UserProfilePicture from '@/features/User/components/ProfilePicture'
import { SeasonParticipantItemPressable_UserFragment } from '@/generated'

export interface SeasonParticipantInfoItemPressableProps
    extends IPressableProps {
    user: SeasonParticipantItemPressable_UserFragment
}

export default function SeasonParticipantItemPressable({
    children,
    user,
    ...rest
}: SeasonParticipantInfoItemPressableProps) {
    return (
        <Pressable
            _hover={{
                backgroundColor: 'blueGray.100'
            }}
            _pressed={{
                backgroundColor: 'blueGray.200'
            }}
            borderRadius={5}
            px={4}
            py={2}
            {...rest}
        >
            <HStack alignItems="center" space={3}>
                <UserProfilePicture size={45} user={user} />
                <Flex flex={1}>{children}</Flex>
            </HStack>
        </Pressable>
    )
}
