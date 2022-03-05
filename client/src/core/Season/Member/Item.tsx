import { HStack, VStack } from 'native-base'
import { ReactNode } from 'react'

import UserItemName from '@/core/User/Item/Name'
import UserItemPressable from '@/core/User/Item/Pressable'
import UserProfilePicture from '@/core/User/Profile/Picture'
import {
    SeasonMemberItem_UserSeasonPermitFragment,
    SeasonPermission
} from '@/generated'

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
            <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={3}>
                    <UserProfilePicture
                        borderRadius={5}
                        size={42}
                        user={user}
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
