import { Link, VStack } from 'native-base'
import RegisterUserForm from '../core/RegisterUserForm'
import SignOutPressable from '../core/SignOut/CancelRegistrationLink'

export default function RegisterUserScreen() {
    return (
        <VStack>
            <RegisterUserForm />
            <SignOutPressable>
                {(onPress) => (
                    <Link onPress={onPress}>Cancel Registration</Link>
                )}
            </SignOutPressable>
        </VStack>
    )
}
