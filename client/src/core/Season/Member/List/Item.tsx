import { HStack, VStack } from 'native-base'
import { ReactNode } from 'react'

import UserItemName from '@/core/User/Item/Name'
import UserItemPressable from '@/core/User/Item/Pressable'
import UserProfilePicture from '@/core/User/Profile/Picture'
import { SeasonMemberListItem_UserSeasonPermitFragment } from '@/generated'

import SeasonRoleBadge from '../Permission/Badge'

export interface SeasonMemberListProps {
    permit: SeasonMemberListItem_UserSeasonPermitFragment
    children?: ReactNode
}

export default function SeasonMemberListItem({
    permit,
    children
}: SeasonMemberListProps) {
    const { user, referee, manager } = permit

    return (
        <UserItemPressable>
            <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={3}>
                    <UserProfilePicture size={45} user={user} />
                    <UserItemName user={user} />
                    <VStack space={0.5}>
                        <HStack mt={0.5} space={2}>
                            {referee.assigned && (
                                <SeasonRoleBadge>Manager</SeasonRoleBadge>
                            )}
                            {manager.assigned && (
                                <SeasonRoleBadge>Referee</SeasonRoleBadge>
                            )}
                        </HStack>
                    </VStack>
                </HStack>
                {children}
            </HStack>
        </UserItemPressable>
    )
}
