import { VStack, Heading, Text } from 'native-base'

import useRegisterUserForm from '@/hooks/useRegisterForm'

import NBControlledInput from '../atoms/NBControlledInput'
import GenericButton from '../atoms/SignInButton'

export default function RegisterUserForm() {
    const { control, submitRegisterUser } = useRegisterUserForm()

    const onSubmit = submitRegisterUser

    return (
        <VStack flex={1} p={4} space={4}>
            <Heading textAlign="center">Register</Heading>
            <NBControlledInput
                control={control}
                name="firstName"
                title="First Name"
            />
            <NBControlledInput
                control={control}
                name="lastName"
                title="Last Name"
            />
            <NBControlledInput
                control={control}
                name="zipCode"
                title="Zip Code"
            />
            <NBControlledInput control={control} name="city" title="City" />
            <NBControlledInput control={control} name="state" title="State" />
            <NBControlledInput
                control={control}
                name="streetAddress"
                title="Street Address"
            />
            <NBControlledInput
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
