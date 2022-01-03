import { Text, Heading, VStack } from 'native-base'
import EmailSignInFormHOC from '../containers/EmailFormContainer'
import FacebookSignInButtonHOC from '../containers/FacebookButton'
import GoogleSignInButtonHOC from '../containers/GoogleButton'
import SignInWrapper from './ScreenWrapper'

export default function Main() {
    return (
        <SignInWrapper>
            <VStack space={4} flex={1}>
                <Heading textAlign="center">Sign In / Sign Up</Heading>
                <GoogleSignInButtonHOC />
                <FacebookSignInButtonHOC />
                <Text textAlign="center">OR</Text>
                <EmailSignInFormHOC />
            </VStack>
        </SignInWrapper>
    )
}
