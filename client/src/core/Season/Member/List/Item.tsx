import { HStack, VStack } from 'native-base'
import { ReactNode } from 'react'

import UserItemName from '@/core/User/Item/Name'
import UserItemPressable from '@/core/User/Item/Pressable'
import UserProfilePicture from '@/core/User/Profile/Picture'
import {
    SeasonMemberListItem_SeasonParticipantPermitFragment,
    SeasonRoleType
} from '@/generated'

import SeasonRoleBadge from '../Role/Badge'

export interface SeasonMemberListProps {
    participant: SeasonMemberListItem_SeasonParticipantPermitFragment
    children?: ReactNode
}

export default function SeasonMemberListItem({
    participant,
    children
}: SeasonMemberListProps) {
    const {
        member: { user },
        roles
    } = participant

    return (
        <UserItemPressable>
            <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={3}>
                    <UserProfilePicture size={45} user={user} />
                    <UserItemName user={user} />
                    <VStack space={0.5}>
                        <HStack mt={0.5} space={2}>
                            {roles.includes(SeasonRoleType.Manager) && (
                                <SeasonRoleBadge>Manager</SeasonRoleBadge>
                            )}
                            {roles.includes(SeasonRoleType.Referee) && (
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
