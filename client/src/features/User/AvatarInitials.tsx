import { ITextProps, Text } from 'native-base'

import { UserAvatarInitials_UserFragment } from '@/graphql/generated'

export interface UserAvatarInitialsProps extends ITextProps {
    user: UserAvatarInitials_UserFragment
}

export default function UserAvatarInitials({ user, ...rest }: UserAvatarInitialsProps) {
    const initials = user.firstName[0] + user.lastName[0]

    return <Text {...rest}>{initials}</Text>
}
