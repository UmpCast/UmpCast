import { Text, VStack } from 'native-base'

import { UserAccountBanner_UserFragment } from '@/generated'
import { capitalize } from '@/utils/primitive'
import UserAvatar from '@/components/User/Avatar'
import UserAvatarInitials from '../../AvatarInitials'

export interface UserAccountBannerProps {
    user: UserAccountBanner_UserFragment
}

export default function UserAccountBanner({ user }: UserAccountBannerProps) {
    const { firstName, lastName, profilePictureUrl } = user

    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`

    return (
        <VStack alignItems="center" space={3}>
            <UserAvatar bgColor="indigo.600" size={65} uri={profilePictureUrl}>
                <UserAvatarInitials color="white" fontSize="lg" user={user} />
            </UserAvatar>
            <Text fontSize="xl" fontWeight="semibold">
                {fullName}
            </Text>
        </VStack>
    )
}
