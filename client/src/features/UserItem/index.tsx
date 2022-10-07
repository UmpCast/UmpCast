import { HStack, VStack, Text, Avatar } from 'native-base'
import { ReactNode } from 'react'

import PressableX from '@/components/PressableX'

import UserAvatar from '../UserAvatar'

import { UserItemFragment } from './index.generated'
import MaterialIcon from '@/components/MaterialIcon'

interface Props {
    user: UserItemFragment
    extra?: ReactNode
    children?: ReactNode
    onPress?: () => void
}

export default function UserItem({ user, extra, children, onPress }: Props) {
    return (
        <PressableX onPress={onPress} rounded="sm" p={2} variant="secondary.ghost">
            <HStack justifyContent="space-between">
                <HStack alignItems="center" space="md">
                    <UserAvatar size="40px" user={user} />
                    <VStack>
                        <Text>
                            {user.firstName} {user.lastName}
                        </Text>
                        <HStack>{extra}</HStack>
                    </VStack>
                </HStack>
                {children}
            </HStack>
        </PressableX>
    )
}

interface NoUserItemProps {
    label: string
    extra?: ReactNode
    children?: ReactNode
    onPress?: () => void
}

export function NoUserItem({ label, extra, children, onPress }: NoUserItemProps) {
    return (
        <PressableX onPress={onPress} rounded="sm" p={2} variant="secondary.ghost">
            <HStack justifyContent="space-between">
                <HStack alignItems="center" space="md">
                    <Avatar size="40px">
                        <MaterialIcon name="account" />
                    </Avatar>
                    <VStack>
                        <Text>{label}</Text>
                        <HStack>{extra}</HStack>
                    </VStack>
                </HStack>
                {children}
            </HStack>
        </PressableX>
    )
}
