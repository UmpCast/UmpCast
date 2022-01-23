import { VStack, Heading, Text } from 'native-base'

import useRegisterUserForm from '@/hooks/useRegisterUserForm'

import NBControlledInput from '../../helper/NBControlledInput'
import GenericButton from '../../helper/SignInButton'

export default () => {
    const { control, submitRegisterUser } = useRegisterUserForm()

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
            <GenericButton disabled={false} onPress={onSubmitPress}>
                <Text bold fontSize="lg">
                    Submit
                </Text>
            </GenericButton>
        </VStack>
    )
}
