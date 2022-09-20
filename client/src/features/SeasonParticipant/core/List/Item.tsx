import { Badge, HStack, IBadgeProps, VStack } from 'native-base'
import { ReactNode } from 'react'

import {
    SeasonParticipantListItem_SeasonParticipantEdgeFragment,
    SeasonRoleType
} from '@/graphql/generated'

import SeasonParticipantItemName from '../../components/ItemName'
import SeasonParticipantItemPressable from '../../components/ItemPressable'

interface SeasonRoleBadgeProps extends IBadgeProps {}

function RoleBadge(props: SeasonRoleBadgeProps) {
    return <Badge _text={{ fontSize: 9 }} colorScheme="indigo" px={1} py={0} {...props} />
}

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
                            <RoleBadge>Manager</RoleBadge>
                        )}
                        {permit.roles.includes(SeasonRoleType.Referee) && (
                            <RoleBadge>Referee</RoleBadge>
                        )}
                    </HStack>
                </VStack>
                {children}
            </HStack>
        </SeasonParticipantItemPressable>
    )
}
