import UserItemName from '@/core/User/Item/Name'
import UserItemPressable from '@/core/User/Item/Pressable'
import UserProfilePicture from '@/core/User/Profile/Picture'
import {
    SeasonMemberItem_UserSeasonPermitFragment,
    SeasonPermission
} from '@/generated'
import { HStack, VStack, Button } from 'native-base'
import { ReactNode } from 'react'
import SeasonPermissionBadge from '../Permission/Badge'

export interface SeasonMemberItemProps {
    permit: SeasonMemberItem_UserSeasonPermitFragment
    children?: ReactNode
}

export default function SeasonMemberItem({
    permit,
    children
}: SeasonMemberItemProps) {
    const { user, permissionList } = permit

    const [isReferee, isManager] = [
        SeasonPermission.Referee,
        SeasonPermission.Manager
    ].map((permission) => permissionList.includes(permission))

    return (
        <UserItemPressable>
            <HStack justifyContent="space-between" alignItems="center">
                <HStack space={3} alignItems="center">
                    <UserProfilePicture
                        user={user}
                        size={42}
                        borderRadius={5}
                    />
                    <VStack space={1}>
                        <UserItemName user={user} />
                        <HStack space={2}>
                            {isManager && (
                                <SeasonPermissionBadge>
                                    Manager
                                </SeasonPermissionBadge>
                            )}
                            {isReferee && (
                                <SeasonPermissionBadge>
                                    Referee
                                </SeasonPermissionBadge>
                            )}
                        </HStack>
                    </VStack>
                </HStack>
                {children}
            </HStack>
        </UserItemPressable>
    )
}
