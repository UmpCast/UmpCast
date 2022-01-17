import { Text, Heading, VStack } from 'native-base'

import SignInWithFBButton from '@/components/SignInWithFBButton'
import GoogleButtonContainer from '@/components/SignInWithGoogleButton'

import ScreenWrapper from './ScreenWrapper'
import SignInEmailForm from './SignInEmailForm'

export default function SignInScreen() {
    return (
        <ScreenWrapper>
            <VStack flex={1} space={4}>
                <Heading textAlign="center">Sign In / Sign Up</Heading>
                <GoogleButtonContainer />
                <SignInWithFBButton />
                <Text textAlign="center">OR</Text>
                <SignInEmailForm />
            </VStack>
        </ScreenWrapper>
    )
}
