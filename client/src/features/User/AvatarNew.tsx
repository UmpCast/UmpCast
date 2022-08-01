import { Feather } from '@expo/vector-icons'
import { Avatar, Icon } from 'native-base'
import { UserAvatarNew_UserFragment } from '@/graphql/generated'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

export interface UserAvatarNewProps extends IAvatarProps {
    user: UserAvatarNew_UserFragment
}

export default function UserAvatarNew({ user, ...rest }: UserAvatarNewProps) {
    const { profilePictureUrl: uri } = user

    if (!uri) {
        return (
            <Avatar {...rest}>
                <Icon as={Feather} color="white" name="user" size={rest.size} />
            </Avatar>
        )
    }

    const source = { uri }

    return <Avatar source={source} {...rest} />
}
