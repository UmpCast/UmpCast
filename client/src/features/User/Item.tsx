import { UserItem_UserFragment } from '@/generated'
import { HStack, Text } from 'native-base'
import UserAvatarNew from './AvatarNew'

interface Props {
    user: UserItem_UserFragment
}

export default function UserItem({ user }: Props) {
    const { firstName, lastName } = user

    return (
        <HStack alignItems="center" space={5}>
            <UserAvatarNew size="sm" user={user} />
            <Text fontWeight="semibold">
                {firstName} {lastName}
            </Text>
        </HStack>
    )
}
