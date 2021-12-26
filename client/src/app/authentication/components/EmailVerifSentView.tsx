import { Text, VStack, Heading, Center } from 'native-base'

export interface EmailVerifSentViewProps {
    email: string
}

export default function EmailVerifSentView({ email }: EmailVerifSentViewProps) {
    return (
        <Center m={4}>
            <VStack alignItems="center" space={4} maxWidth={400}>
                <Heading>Check your Email</Heading>
                <Text textAlign="center">
                    Please check for a login link at <Text bold>{email}</Text>
                </Text>
            </VStack>
        </Center>
    )
}
