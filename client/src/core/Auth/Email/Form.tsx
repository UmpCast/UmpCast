import AsyncStorage from '@react-native-async-storage/async-storage'
import { VStack, Text, FormControl, Input } from 'native-base'

import SignInButton from '@/core/Auth/SignIn/Solid'
import NBFormControl from '@/lib/NB/FormControl'
import { EMAIL_SIGN_IN_KEY } from '@/constants/storage'
import useSignInSendEmail, {
    EmailSignInInput
} from '@/core/Auth/Email/useLinkForm'

export default function AuthEmailForm({
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
            <NBFormControl
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
