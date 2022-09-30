import { Avatar } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

import { UserAvatarFragment } from './index.generated'

export interface UserAvatarProps extends IAvatarProps {
    user: UserAvatarFragment
}

export default function UserAvatar({ user, ...rest }: UserAvatarProps) {
    const uri = user.profilePictureUrl

    return <Avatar {...rest} source={uri ? { uri } : undefined} />
}
