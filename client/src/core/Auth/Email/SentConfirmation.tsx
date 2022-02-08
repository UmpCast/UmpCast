import { RouteProp, useRoute } from '@react-navigation/native'
import { Text, VStack, Heading, Center } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.AuthEmailSent
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
