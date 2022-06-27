import { Avatar } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

export interface UserAvatarProps extends IAvatarProps {
    uri?: string | null
}

export default function UserAvatar({ uri, ...rest }: UserAvatarProps) {
    return <Avatar {...rest} source={uri ? { uri } : undefined} />
}
