import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { VStack, Button, FormControl, Input } from 'native-base'
import { useForm } from 'react-hook-form'

import NBController from '@/app/common/containers/NBController'
import emailVerifCreateSchema, {
    EmailVerifCreateInput
} from '../utils/emailVerifCreateSchema'

export interface EmailVerifCreateFormProps {
    onSubmit: (input: EmailVerifCreateInput) => Promise<any>
}

export default function EmailVerifCreateForm({
    onSubmit
}: EmailVerifCreateFormProps) {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<EmailVerifCreateInput>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(emailVerifCreateSchema)
    })

    return (
        <VStack mx="4" space={4} mt={2}>
            <NBController
                name="email"
                control={control}
                isRequired
                render={({ field, fieldState }) => (
                    <>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            testID="email-input"
                            onChangeText={field.onChange}
                            value={field.value}
                            _focus={{ borderColor: 'indigo.500' }}
                        />
                        <FormControl.ErrorMessage testID="email-error">
                            {fieldState.error?.message}
                        </FormControl.ErrorMessage>
                    </>
                )}
            />
            <Button
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                colorScheme="indigo"
            >
                Verify
            </Button>
        </VStack>
    )
}
