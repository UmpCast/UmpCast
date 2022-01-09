import { Text, VStack, Heading, Center } from 'native-base'

import { useRoute, RouteProp } from '@react-navigation/native'

import { RootStackParamList, RootStackRoutes } from '@/rootStack'

type SignInEmailSentScreenProps = RouteProp<
    RootStackParamList,
    RootStackRoutes.SignInEmailSent
>

export default function SignInEmailSentScreen() {
    const { params } = useRoute<SignInEmailSentScreenProps>()

    return (
        <Center m={4}>
            <VStack alignItems="center" space={4} maxWidth={400}>
                <Heading>Check your Email</Heading>
                <Text textAlign="center">
                    Please check for a login link at{' '}
                    <Text bold>{params.email}</Text>
                </Text>
            </VStack>
        </Center>
    )
}
