import { HStack, VStack } from 'native-base'
import { ReactNode } from 'react'

import {
    SeasonParticipantListItem_SeasonParticipantEdgeFragment,
    SeasonRoleType
} from '@/generated'
import SeasonRoleBadge from '@/core/Season/About/SeasonParticipantRoleBadge'
import SeasonParticipantItemName from '../Item/Name'
import SeasonParticipantItemPressable from '../Item/Pressable'

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
        <SeasonParticipantItemPressable user={user}>
            <HStack alignItems="center" justifyContent="space-between">
                <VStack space={0.5}>
                    <SeasonParticipantItemName user={user} />
                    <HStack mt={0.5} space={2}>
                        {permit.roles.includes(SeasonRoleType.Manager) && (
                            <SeasonRoleBadge>Manager</SeasonRoleBadge>
                        )}
                        {permit.roles.includes(SeasonRoleType.Referee) && (
                            <SeasonRoleBadge>Referee</SeasonRoleBadge>
                        )}
                    </HStack>
                </VStack>
                {children}
            </HStack>
        </SeasonParticipantItemPressable>
    )
}
