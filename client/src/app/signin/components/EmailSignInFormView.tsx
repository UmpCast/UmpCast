import { VStack, Text, FormControl, Input } from 'native-base'

import { Control, FormState } from 'react-hook-form'
import NBController from '@/app/common/components/NBController'
import GenericSignInButton from './GenericSignInButton'
import { EmailSignInInput } from '../utils/emailSignInSchema'

export interface EmailSignInFormViewProps {
    control: Control<EmailSignInInput>
    formState: FormState<EmailSignInInput>
    onSubmit: () => Promise<any>
}

export default function EmailSignInFormView({
    control,
    formState,
    onSubmit
}: EmailSignInFormViewProps) {
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
            <GenericSignInButton
                onPress={onSubmit}
                disabled={formState.isSubmitting}
            >
                <Text bold fontSize="lg">
                    Continue with Email
                </Text>
            </GenericSignInButton>
        </VStack>
    )
}
