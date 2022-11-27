import { HStack, VStack, Text, Avatar } from 'native-base'
import React, { ReactNode } from 'react'

import MaterialIcon from '@/components/MaterialIcon'

import UserAvatar from '../UserAvatar'

import { UserItemFragment } from './index.generated'
import SurfacePressable from '@/components/SurfacePressable'

interface Props {
    user: UserItemFragment
    extra?: ReactNode
    children?: ReactNode
    onPress?: () => void
}

export default function UserItem({ user, extra, children, onPress }: Props) {
    return (
        <SurfacePressable
            onPress={onPress}
            p={2}
            variant="secondary.ghost"
        >
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
        </SurfacePressable>
    )
}

interface NoUserItemProps {
    label: string
    extra?: ReactNode
    children?: ReactNode
    onPress?: () => void
}

export function NoUserItem({
    label,
    extra,
    children,
    onPress
}: NoUserItemProps) {
    return (
        <SurfacePressable
            onPress={onPress}
            p={2}
            variant="secondary.ghost"
        >
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
        </SurfacePressable>
    )
}
