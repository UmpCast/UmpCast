import { VStack, Heading, Text, FormControl } from 'native-base'

import useRegisterUserForm from '@/hooks/useRegisterForm'

import GenericButton from './GenericButton'
import NBController from './NBController'
import { NBFormError, NBTextInput, NBTextInputProps } from './NBInput'

function NBRegisterTextInput(props: NBTextInputProps) {
    return <NBTextInput _focus={{ borderColor: 'indigo.500' }} {...props} />
}

export default function RegisterUserForm() {
    const { control, submitRegisterUser } = useRegisterUserForm()

    const onSubmit = submitRegisterUser

    return (
        <VStack space={4} flex={1} p={4}>
            <Heading textAlign="center">Register</Heading>
            <NBController
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                    <VStack>
                        <FormControl.Label>First Name</FormControl.Label>
                        <NBRegisterTextInput field={field} />
                        <NBFormError field={field} fieldState={fieldState} />
                    </VStack>
                )}
            />
            <NBController
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                    <VStack>
                        <FormControl.Label>Last Name</FormControl.Label>
                        <NBRegisterTextInput field={field} />
                        <NBFormError field={field} fieldState={fieldState} />
                    </VStack>
                )}
            />
            <NBController
                name="streetAddress"
                control={control}
                render={({ field, fieldState }) => (
                    <VStack>
                        <FormControl.Label>Street Address</FormControl.Label>
                        <NBRegisterTextInput field={field} />
                        <NBFormError field={field} fieldState={fieldState} />
                    </VStack>
                )}
            />
            <NBController
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                    <VStack>
                        <FormControl.Label>City</FormControl.Label>
                        <NBRegisterTextInput field={field} />
                        <NBFormError field={field} fieldState={fieldState} />
                    </VStack>
                )}
            />
            <NBController
                name="state"
                control={control}
                render={({ field, fieldState }) => (
                    <VStack>
                        <FormControl.Label>State</FormControl.Label>
                        <NBRegisterTextInput field={field} />
                        <NBFormError field={field} fieldState={fieldState} />
                    </VStack>
                )}
            />
            <NBController
                name="zipCode"
                control={control}
                render={({ field, fieldState }) => (
                    <VStack>
                        <FormControl.Label>Zip Code</FormControl.Label>
                        <NBRegisterTextInput field={field} />
                        <NBFormError field={field} fieldState={fieldState} />
                    </VStack>
                )}
            />
            <NBController
                name="phoneNumber"
                control={control}
                render={({ field, fieldState }) => (
                    <VStack>
                        <FormControl.Label>Phone Number</FormControl.Label>
                        <NBRegisterTextInput field={field} />
                        <NBFormError field={field} fieldState={fieldState} />
                    </VStack>
                )}
            />
            <GenericButton onPress={onSubmit} disabled={false}>
                <Text bold fontSize="lg">
                    Submit
                </Text>
            </GenericButton>
        </VStack>
    )
}
