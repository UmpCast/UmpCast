import { VStack } from 'native-base'
import RegisterUserForm from '../../core/RegisterUserForm'
import CancelRegistrationLink from '../../core/RegisterUserForm/CancelLink'

export default function RegisterUserScreen() {
    return (
        <VStack m={4}>
            <RegisterUserForm />
            <CancelRegistrationLink />
        </VStack>
    )
}
