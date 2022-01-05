import { Text, Heading, VStack } from 'native-base'

import EmailSignInFormHOC from '../containers/EmailFormContainer'
import FacebookButtonContainer from '../containers/FacebookButtonContainer'
import GoogleButtonContainer from '../containers/GoogleButtonContainer'

import ScreenWrapper from './ScreenWrapper'

export default function Main() {
    return (
        <ScreenWrapper>
            <VStack space={4} flex={1}>
                <Heading textAlign="center">Sign In / Sign Up</Heading>
                <GoogleButtonContainer />
                <FacebookButtonContainer />
                <Text textAlign="center">OR</Text>
                <EmailSignInFormHOC />
            </VStack>
        </ScreenWrapper>
    )
}
