import { Text, Heading, VStack } from 'native-base'

import SignInFBButton from '@/components/SignInFBButton'
import GoogleButtonContainer from '@/components/SignInGoogleButton'

import ScreenWrapper from './ScreenWrapper'
import SignInEmailForm from './SignInEmailForm'

export default function SignInScreen() {
    return (
        <ScreenWrapper>
            <VStack flex={1} space={4}>
                <Heading textAlign="center">Sign In / Sign Up</Heading>
                <GoogleButtonContainer />
                <SignInFBButton />
                <Text textAlign="center">OR</Text>
                <SignInEmailForm />
            </VStack>
        </ScreenWrapper>
    )
}
