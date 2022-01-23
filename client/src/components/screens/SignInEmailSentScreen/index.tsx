import { RootStackParamList, RootStackRoutes } from '@/navigation'
import { Text, VStack, Heading, Center } from 'native-base'
import { StackScreenProps } from '@react-navigation/stack'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.SignInEmailSent
>

export default function SignInEmailSentScreen({ route }: Props) {
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
