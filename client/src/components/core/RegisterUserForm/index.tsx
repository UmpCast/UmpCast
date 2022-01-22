import { VStack, Heading, Text } from 'native-base'

import useRegisterUserForm from '@/hooks/useRegisterUserForm'

import NBControlledInput from '../../helper/NBControlledInput'
import GenericButton from '../../helper/SignInButton'
import SignOutPressable from '../SignOut/CancelRegistrationLink'

export default () => {
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
            <SignOutPressable >
                {onPress => <GenericButton disabled={false} onPress={onPress}>
                    <Text bold fontSize="lg">
                        Submit
                    </Text>
                </GenericButton>}
            </SignOutPressable>
        </VStack>
    )
}
