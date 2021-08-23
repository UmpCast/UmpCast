import React from 'react'

import { VStack, Center, Text } from 'native-base'

interface Props {
    title: string
    children: React.ReactNode
}

export default function SignupWrapper(props: Props) {
    const { title, children } = props

    return (
        <VStack space={4} width="100%">
            <Center>
                <Text fontSize="2xl" bold>
                    {title}
                </Text>
            </Center>
            {children}
        </VStack>
    )
}
