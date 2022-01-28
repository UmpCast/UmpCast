import { Text, VStack, Heading, Center } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/navigation'
import { RouteProp, useRoute } from '@react-navigation/native'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SignInEmailSent
>

export default function AuthEmailSentConfirmation() {
    const route = useRoute<ScreenRouteProp>()

    return (
        <Center m={4}>
            <VStack alignItems="center" maxWidth={400} space={4}>
                <Heading>Check your Email</Heading>
                <Text textAlign="center">
                    Please check for a login link at{' '}
                    <Text bold>{route.params.email}</Text>
                </Text>
            </VStack>
        </Center>
    )
}
