import { VStack, Text } from 'native-base'

import * as Form from '@/components/Form'

import useUserRegistrationForm from './UserRegistrationuseForm'
import AuthSignInButton from '@/core/App/SignIn/Button'

export default function UserRegistrationForm() {
    const { control, onSubmit } = useUserRegistrationForm()

    return (
        <VStack space={4}>
            <Form.Controller
                control={control}
                name="firstName"
                render={() => (
                    <Form.Control>
                        <Form.Label>First Name</Form.Label>
                        <Form.Input />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <Form.Controller
                control={control}
                name="lastName"
                render={() => (
                    <Form.Control>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Input />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <Form.Controller
                control={control}
                name="phoneNumber"
                render={() => (
                    <Form.Control>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Input />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <AuthSignInButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Submit
                </Text>
            </AuthSignInButton>
        </VStack>
    )
}
