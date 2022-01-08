import { VStack, Text, FormControl, Input } from 'native-base'
import { Control, FormState } from 'react-hook-form'

import NBController from '@/components/common/NBController'

import GenericButton from './GenericButton'
import { EmailSignInInput } from '../emailSchema'

export interface EmailFormProps {
    control: Control<EmailSignInInput>
    formState: FormState<EmailSignInInput>
    onSubmit: () => Promise<any>
}

export default function EmailForm({
    control,
    formState,
    onSubmit
}: EmailFormProps) {
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
            <GenericButton onPress={onSubmit} disabled={formState.isSubmitting}>
                <Text bold fontSize="lg">
                    Continue with Email
                </Text>
            </GenericButton>
        </VStack>
    )
}
