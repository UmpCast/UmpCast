import { Avatar } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

import { UserAvatar_UserFragment } from '@/generated'

export interface UserAvatarProps extends IAvatarProps {
    user: UserAvatar_UserFragment
}

export default function UserAvatar({
    user,
    bgColor,
    ...rest
}: UserAvatarProps) {
    return (
        <Avatar
            bgColor={user.profilePictureUrl ? undefined : bgColor}
            source={
                user.profilePictureUrl
                    ? { uri: user.profilePictureUrl }
                    : undefined
            }
            {...rest}
        />
    )
}
