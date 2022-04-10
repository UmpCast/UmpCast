import { UserAccountBanner_UserFragment } from '@/generated'
import UserAvatar from '../../components/Avatar'
import { Text, VStack } from 'native-base'
import { capitalize } from '@/utils/object'
import UserAvatarInitials from '../../components/AvatarInitials'

export interface UserAccountBannerProps {
    user: UserAccountBanner_UserFragment
}

export default function UserAccountBanner({ user }: UserAccountBannerProps) {
    const fullName =
        capitalize(user.firstName) + ' ' + capitalize(user.lastName)

    return (
        <VStack space={3} alignItems="center">
            <UserAvatar size={65} user={user} bgColor="indigo.600">
                <UserAvatarInitials user={user} color="white" fontSize="lg" />
            </UserAvatar>
            <Text fontSize="xl" fontWeight="semibold">
                {fullName}
            </Text>
        </VStack>
    )
}
