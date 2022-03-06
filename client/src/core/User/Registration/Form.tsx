import { VStack, Text } from 'native-base'

import SignInButton from '@/core/Auth/SignIn/Solid'
import NBControlledInput from '@/lib/NB/ControlledInput'

import useUserRegistrationForm from './useForm'

export default function RegistrationForm() {
    const { control, onSubmit } = useUserRegistrationForm()

    return (
        <VStack space={4}>
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
            <SignInButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Submit
                </Text>
            </SignInButton>
        </VStack>
    )
}
