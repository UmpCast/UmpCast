import { VStack, Text } from 'native-base'

import SolidButton from '@/components/Button/Solid'
import NBControlledInput from '@/components/NB/ControlledInput'

import useUserRegistrationForm from './useForm'

export default function RegistrationForm() {
    const { control, submitRegisterUser } = useUserRegistrationForm()

    const onSubmitPress = submitRegisterUser

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
            <SolidButton disabled={false} onPress={onSubmitPress}>
                <Text bold fontSize="lg">
                    Submit
                </Text>
            </SolidButton>
        </VStack>
    )
}
