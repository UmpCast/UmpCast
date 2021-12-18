import React from 'react'

import { Text, VStack, Heading, Center } from 'native-base'

export interface EmailVerifSentViewProps {
    email: string
}

export default function EmailVerifSentView({ email }: EmailVerifSentViewProps) {
    return (
        <Center m={4}>
            <VStack alignItems="center" space={4} maxWidth={400}>
                <Heading>Verify your Email</Heading>
                <Text textAlign="center">
                    Check for a verification email at <Text bold>{email}</Text>{' '}
                    to complete your registration.
                </Text>
            </VStack>
        </Center>
    )
}
