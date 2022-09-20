import { useRoute } from '@react-navigation/native'
import { Center, VStack, Heading, Text } from 'native-base'

import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type ScreenProps = RootStackScreenProps<RootStackRoute.LoginLinkSent>

export default function LoginLinkSentScreen() {
    const route = useRoute<ScreenProps['route']>()

    return (
        <Center m={4}>
            <VStack alignItems="center" maxWidth={400} space={4}>
                <Heading>Check your Email</Heading>
                <Text textAlign="center">
                    Please check for a login link at <Text bold>{route.params.email}</Text>
                </Text>
            </VStack>
        </Center>
    )
}
