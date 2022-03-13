import { HStack, VStack } from 'native-base'
import { ReactNode } from 'react'

import UserProfilePicture from '@/core/User/Profile/Picture'
import {
    SeasonParticipantListItem_SeasonParticipantEdgeFragment,
    SeasonRoleType
} from '@/generated'

import SeasonRoleBadge from '../Role/Badge'
import SeasonParticipantInfoItemName from '../Info/ItemName'
import SeasonParticipantInfoItemPressable from '../Info/ItemPressable'

export interface SeasonParticipantListProps {
    participant: SeasonParticipantListItem_SeasonParticipantEdgeFragment
    children?: ReactNode
}

export default function SeasonParticipantListItem({
    participant,
    children
}: SeasonParticipantListProps) {
    const { node: user, permit } = participant

    return (
        <SeasonParticipantInfoItemPressable>
            <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={3}>
                    <UserProfilePicture size={45} user={user} />
                    <SeasonParticipantInfoItemName user={user} />
                    <VStack space={0.5}>
                        <HStack mt={0.5} space={2}>
                            {permit.roles.includes(SeasonRoleType.Manager) && (
                                <SeasonRoleBadge>Manager</SeasonRoleBadge>
                            )}
                            {permit.roles.includes(SeasonRoleType.Referee) && (
                                <SeasonRoleBadge>Referee</SeasonRoleBadge>
                            )}
                        </HStack>
                    </VStack>
                </HStack>
                {children}
            </HStack>
        </SeasonParticipantInfoItemPressable>
    )
}
