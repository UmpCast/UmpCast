import AsyncStorage from '@react-native-async-storage/async-storage'
import { VStack, Text, FormControl, Input } from 'native-base'

import NBController from '@/components/helper/NBController'
import { EMAIL_SIGN_IN_KEY } from '@/constants'
import useSignInSendEmail, {
    EmailSignInInput
} from '@/hooks/useSignInEmailForm'

import SignInButton from '../../helper/SignInButton'

export default function EmailForm({
    onSend
}: {
    onSend: (input: EmailSignInInput) => void
}) {
    const { formState, control, onSubmit } = useSignInSendEmail({
        onSuccess: async (input) => {
            await AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, input.email)
            onSend(input)
        }
    })

    return (
        <VStack space={4}>
            <NBController
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                    <>
                        <Input
                            _focus={{ borderColor: 'indigo.500' }}
                            borderWidth={2}
                            onChangeText={field.onChange}
                            placeholder="Enter email address"
                            size="lg"
                            testID="email-input"
                            value={field.value}
                        />
                        <FormControl.ErrorMessage testID="email-error">
                            {fieldState.error?.message}
                        </FormControl.ErrorMessage>
                    </>
                )}
            />
            <SignInButton disabled={formState.isSubmitting} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Continue with Email
                </Text>
            </SignInButton>
        </VStack>
    )
}
