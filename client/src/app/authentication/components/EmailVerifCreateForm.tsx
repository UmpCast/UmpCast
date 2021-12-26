import { VStack, Button, FormControl, Input } from 'native-base'

import NBController from '@/app/common/components/NBController'

export interface EmailVerifCreateFormProps {
    control: any
    formState: any
    onSubmit: any
}

export default function EmailVerifCreateForm({
    control,
    formState,
    onSubmit
}: EmailVerifCreateFormProps) {
    return (
        <VStack mx="4" space={4} mt={2}>
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
                            placeholder="Enter email address"
                        />
                        <FormControl.ErrorMessage testID="email-error">
                            {fieldState.error?.message}
                        </FormControl.ErrorMessage>
                    </>
                )}
            />
            <Button
                onPress={onSubmit}
                disabled={formState.isSubmitting}
                colorScheme="indigo"
            >
                Continue with Email
            </Button>
        </VStack>
    )
}
