import { Text, VStack } from 'native-base'

import { UserAccountBanner_UserFragment } from '@/generated'
import { capitalize } from '@/utils/object'

import UserAvatar from '../../components/Avatar'
import UserAvatarInitials from '../../components/AvatarInitials'

export interface UserAccountBannerProps {
    user: UserAccountBanner_UserFragment
}

export default function UserAccountBanner({ user }: UserAccountBannerProps) {
    const fullName = `${capitalize(user.firstName)} ${capitalize(
        user.lastName
    )}`

    return (
        <VStack alignItems="center" space={3}>
            <UserAvatar bgColor="indigo.600" size={65} user={user}>
                <UserAvatarInitials color="white" fontSize="lg" user={user} />
            </UserAvatar>
            <Text fontSize="xl" fontWeight="semibold">
                {fullName}
            </Text>
        </VStack>
    )
}
