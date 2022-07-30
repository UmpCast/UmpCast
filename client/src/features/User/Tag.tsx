import { UserTag_UserFragment } from '@/generated'
import { HStack, Text } from 'native-base'
import UserAvatarNew from './AvatarNew'

interface Props {
    user: UserTag_UserFragment
    bold?: boolean
}

export default function UserTag({ user, bold = true }: Props) {
    const { firstName, lastName } = user

    return (
        <HStack alignItems="center" space={5}>
            <UserAvatarNew size="sm" user={user} />
            <Text fontWeight={bold ? "semibold" : "normal"}>
                {firstName} {lastName}
            </Text>
        </HStack>
    )
}
