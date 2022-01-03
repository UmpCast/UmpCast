import { VStack, Text, FormControl, Input } from 'native-base'

import { Control, FormState } from 'react-hook-form'
import { EmailSignInInput } from '@/validation/signInEmailSchema'
import SignInGenericButton from './GenericButton'
import NBController from '@/components/common/NBController'

export interface SignInEmailFormProps {
    control: Control<EmailSignInInput>
    formState: FormState<EmailSignInInput>
    onSubmit: () => Promise<any>
}

export default function SignInEmailForm({
    control,
    formState,
    onSubmit
}: SignInEmailFormProps) {
    return (
        <VStack space={4}>
            <NBController
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <Input
                            testID="email-input"
                            onChangeText={field.onChange}
                            value={field.value}
                            _focus={{ borderColor: 'indigo.500' }}
                            borderWidth={2}
                            size="lg"
                            placeholder="Enter email address"
                        />
                        <FormControl.ErrorMessage testID="email-error">
                            {fieldState.error?.message}
                        </FormControl.ErrorMessage>
                    </>
                )}
            />
            <SignInGenericButton
                onPress={onSubmit}
                disabled={formState.isSubmitting}
            >
                <Text bold fontSize="lg">
                    Continue with Email
                </Text>
            </SignInGenericButton>
        </VStack>
    )
}
