import { Heading, VStack } from 'native-base'
import UserRegistrationCancelLink from './UserRegistrationCancelLink'
import UserRegistrationForm from './UserRegistrationForm'

export default function UserRegistrationScreen() {
    return (
        <VStack p={4}>
            <Heading textAlign="center">Register</Heading>
            <VStack space={4}>
                <UserRegistrationForm />
                <UserRegistrationCancelLink />
            </VStack>
        </VStack>
    )
}
