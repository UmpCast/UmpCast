import { VStack, Heading, Text, FormControl } from 'native-base'

import useRegisterUserForm from '@/hooks/useRegisterForm'

import GenericButton from './GenericButton'
import NBController from './NBController'
import { Control } from 'react-hook-form'
import NBErrorMessage from './NBErrorMessage'
import NBInput from './NBInput'

function ControlledInput({
    control,
    title,
    name
}: {
    control: Control<any>
    title: string
    name: string
}) {
    return (
        <NBController
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <VStack>
                    <FormControl.Label>{title}</FormControl.Label>
                    <NBInput field={field} />
                    <NBErrorMessage field={field} fieldState={fieldState} />
                </VStack>
            )}
        />
    )
}

export default function RegisterUserForm() {
    const { control, submitRegisterUser } = useRegisterUserForm()

    const onSubmit = submitRegisterUser

    return (
        <VStack space={4} flex={1} p={4}>
            <Heading textAlign="center">Register</Heading>
            <ControlledInput
                control={control}
                name="firstName"
                title="First Name"
            />
            <ControlledInput
                control={control}
                name="lastName"
                title="Last Name"
            />
            <ControlledInput
                control={control}
                name="zipCode"
                title="Zip Code"
            />
            <ControlledInput control={control} name="city" title="City" />
            <ControlledInput control={control} name="state" title="State" />
            <ControlledInput
                control={control}
                name="streetAddress"
                title="Street Address"
            />
            <ControlledInput
                control={control}
                name="phoneNumber"
                title="Phone Number"
            />
            <GenericButton onPress={onSubmit} disabled={false}>
                <Text bold fontSize="lg">
                    Submit
                </Text>
            </GenericButton>
        </VStack>
    )
}
