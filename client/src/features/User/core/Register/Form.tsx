import { VStack, Text } from 'native-base'

import * as Form from '@/blocks/Form'
import AuthLoginButton from '@/features/Auth/core/Login/Button'

import useUserRegisterForm from './useForm'

export default function UserRegisterForm() {
    const { control, onSubmit } = useUserRegisterForm()

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
            <AuthLoginButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Submit
                </Text>
            </AuthLoginButton>
        </VStack>
    )
}
