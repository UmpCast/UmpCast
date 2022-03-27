import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'
import { AppRootStackScreenProps } from '@/navigation/screenProps'
import { useRoute } from '@react-navigation/native'
import { Center, VStack, Heading, Text } from 'native-base'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.AuthEmailSent>

export default function AuthEmailSentConfirmation() {
    const route = useRoute<ScreenProps['route']>()

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
