import { Heading, VStack } from 'native-base'
import RegisterUserForm from '../../core/RegisterUserForm'
import CancelRegistrationLink from '../../core/RegisterUserForm/CancelLink'

export default function RegisterUserScreen() {
    return (
        <VStack p={4}>
            <Heading textAlign="center">Register</Heading>
            <VStack space={4}>
                <RegisterUserForm />
                <CancelRegistrationLink />
            </VStack>
        </VStack>
    )
}
