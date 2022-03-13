import { HStack, VStack } from 'native-base'
import { ReactNode } from 'react'

import {
    SeasonParticipantListItem_SeasonParticipantEdgeFragment,
    SeasonRoleType
} from '@/generated'

import SeasonParticipantInfoItemName from './SeasonParticipantInfoItemName'
import SeasonParticipantInfoItemPressable from './SeasonParticipantInfoItemPressable'
import SeasonRoleBadge from './SeasonParticipantRoleBadge'
import UserProfilePicture from './UserProfilePicture'

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
