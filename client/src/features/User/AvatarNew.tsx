import { Feather } from '@expo/vector-icons'
import { Avatar, Icon } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

import { UserAvatarNew_UserFragment } from '@/graphql/generated'

export interface UserAvatarNewProps extends IAvatarProps {
    user: UserAvatarNew_UserFragment
}

export default function UserAvatarNew({ user, ...rest }: UserAvatarNewProps) {
    const { profilePictureUrl: uri } = user

    if (!uri) {
        return (
            <Avatar {...rest}>
                <Icon
                    as={Feather}
                    color="white"
                    name="user"
                    button={rest.button}
                />
            </Avatar>
        )
    }

    const source = { uri }

    return <Avatar source={source} {...rest} />
}
