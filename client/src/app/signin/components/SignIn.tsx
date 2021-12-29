import { Text, Heading, VStack } from 'native-base'
import EmailVerifCreateFormHOC from '../containers/EmailSignInFormHOC'
import FacebookSignInButtonHOC from '../containers/FacebookSignInButtonHOC'
import GoogleSignInButtonHOC from '../containers/GoogleSignInButtonHOC'
import SignInWrapper from './SignInWrapper'

export default function SignIn() {
    return (
        <SignInWrapper>
            <VStack space={4} flex={1}>
                <Heading textAlign="center">Sign In / Sign Up</Heading>
                <GoogleSignInButtonHOC />
                <FacebookSignInButtonHOC />
                <Text textAlign="center">OR</Text>
                <EmailVerifCreateFormHOC />
            </VStack>
        </SignInWrapper>
    )
}
