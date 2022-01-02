import { Text, Heading, VStack } from 'native-base'
import EmailSignInFormHOC from '../containers/EmailSignInForm'
import FacebookSignInButtonHOC from '../containers/FacebookSignInButton'
import GoogleSignInButtonHOC from '../containers/GoogleSignInButton'
import SignInWrapper from './SignInWrapper'

export default function SignInView() {
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
