import { HStack, VStack } from 'native-base'
import { ReactNode } from 'react'

import UserItemPressable from '@/core/User/Item/Pressable'
import UserProfilePicture from '@/core/User/Profile/Picture'
import {
    SeasonMemberListItem_UserSeasonPermitFragment,
    SeasonPermission
} from '@/generated'

import SeasonPermissionBadge from '../Permission/Badge'
import UserItemName from '@/core/User/Item/Name'

export interface SeasonMemberListProps {
    permit: SeasonMemberListItem_UserSeasonPermitFragment
    children?: ReactNode
}

export default function SeasonMemberListItem({
    permit,
    children
}: SeasonMemberListProps) {
    const { user, permissionList } = permit

    const [isReferee, isManager] = [
        SeasonPermission.Referee,
        SeasonPermission.Manager
    ].map((permission) => permissionList.includes(permission))

    return (
        <UserItemPressable>
            <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={3}>
                    <UserProfilePicture size={45} user={user} />
                    <UserItemName user={user} />
                    <VStack space={0.5}>
                        <HStack mt={0.5} space={2}>
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
