import { VStack, Heading, Text, FormControl } from 'native-base'
import { Control } from 'react-hook-form'

import useRegisterUserForm from '@/hooks/useRegisterForm'

import GenericButton from './GenericButton'
import NBController from './NBController'
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
            control={control}
            name={name}
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
        <VStack flex={1} p={4} space={4}>
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
            <GenericButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Submit
                </Text>
            </GenericButton>
        </VStack>
    )
}
