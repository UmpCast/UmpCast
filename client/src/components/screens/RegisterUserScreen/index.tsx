import { Heading, VStack } from 'native-base'
import RegisterUserForm from '../../core/RegisterUserForm'
import CancelRegistrationLink from '../../core/RegisterUserForm/CancelLink'

export default function RegisterUserScreen() {
    return (
        <VStack p={4} m={4}>
            <Heading textAlign="center">Register</Heading>
            <RegisterUserForm />
            <CancelRegistrationLink />
        </VStack>
    )
}
