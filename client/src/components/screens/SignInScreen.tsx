import { Text, Heading, VStack } from 'native-base'

import SignInFBButton from '@/components/organisms/SignInFBButton'

import ScreenWrapper from '../atoms/ScreenWrapper'
import SignInEmailForm from '../organisms/SignInEmailForm'
import SignInGoogleButton from '../organisms/SignInGoogleButton'

export default function SignInScreen() {
    return (
        <ScreenWrapper>
            <VStack flex={1} space={4}>
                <Heading textAlign="center">Sign In / Sign Up</Heading>
                <SignInGoogleButton />
                <SignInFBButton />
                <Text textAlign="center">OR</Text>
                <SignInEmailForm />
            </VStack>
        </ScreenWrapper>
    )
}
