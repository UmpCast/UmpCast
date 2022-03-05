import { VStack, Text } from 'native-base'

import SignInButton from '@/core/Auth/SignIn/Solid'

import useUserRegistrationForm from './useForm'
import * as Form from '@/components/Form'

export default function RegistrationForm() {
    const { control, onSubmit } = useUserRegistrationForm()

    return (
        <VStack space={4}>
            <Form.Controller
                name="firstName"
                control={control}
                render={() => {
                    return (
                        <Form.Control>
                            <Form.Label>First Name</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )
                }}
            />
            <Form.Controller
                name="lastName"
                control={control}
                render={() => {
                    return (
                        <Form.Control>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )
                }}
            />
            <Form.Controller
                name="zipCode"
                control={control}
                render={() => {
                    return (
                        <Form.Control>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )
                }}
            />
            <Form.Controller
                name="city"
                control={control}
                render={() => {
                    return (
                        <Form.Control>
                            <Form.Label>City</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )
                }}
            />
            <Form.Controller
                name="state"
                control={control}
                render={() => {
                    return (
                        <Form.Control>
                            <Form.Label>State</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )
                }}
            />
            <Form.Controller
                name="streetAddress"
                control={control}
                render={() => {
                    return (
                        <Form.Control>
                            <Form.Label>Street Address</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )
                }}
            />
            <Form.Controller
                name="phoneNumber"
                control={control}
                render={() => {
                    return (
                        <Form.Control>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )
                }}
            />
            <SignInButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Submit
                </Text>
            </SignInButton>
        </VStack>
    )
}
