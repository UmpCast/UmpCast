import { Heading, VStack } from 'native-base'

import UserRegistrationCancelLink from './CancelLink'
import RegistrationForm from './Form'

export default function UserRegistrationScreen() {
    return (
        <VStack p={4}>
            <Heading textAlign="center">Register</Heading>
            <VStack space={4}>
                <RegistrationForm />
                <UserRegistrationCancelLink />
            </VStack>
        </VStack>
    )
}
