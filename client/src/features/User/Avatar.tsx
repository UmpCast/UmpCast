import { UserAvatar_UserFragment } from '@/graphql/generated'
import { Avatar } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

export interface UserAvatarProps extends IAvatarProps {
    user: UserAvatar_UserFragment
}

export default function UserAvatar({ user, ...rest }: UserAvatarProps) {
    const uri = user.profilePictureUrl

    return <Avatar {...rest} source={uri ? { uri } : undefined} />
}
