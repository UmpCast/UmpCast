import { HStack, VStack, Text } from 'native-base'
import { ReactNode } from 'react'

import PressableX from '@/components/PressableX'

import UserAvatar from '../UserAvatar'

import { UserItemFragment } from './index.generated'

interface Props {
    user: UserItemFragment
    extra?: ReactNode
    children?: ReactNode
}

export default function UserItem({ user, extra, children }: Props) {
    return (
        <PressableX
            key={user.id}
            onPress={() => {}}
            rounded="sm"
            size="sm"
            variant="secondary.ghost"
        >
            <HStack justifyContent="space-between">
                <HStack alignItems="center" space="md">
                    <UserAvatar size="sm" user={user} />
                    <VStack>
                        <Text bold fontSize="sm">
                            {user.firstName} {user.lastName}
                        </Text>
                        {extra}
                    </VStack>
                </HStack>
                {children}
            </HStack>
        </PressableX>
    )
}
