import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { VStack, Button, FormControl, Input } from 'native-base'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import NBController from '@/app/common/components/NBController'

const emailVerificationSchema = yup.object().shape({
    email: yup.string().email().required()
})

export type EmailVerificationInput = {
    email: string
}

export interface EmailVerificationFormProps {
    onSubmit: (input: EmailVerificationInput) => Promise<any>
}

export default function EmailVerificationForm({
    onSubmit
}: EmailVerificationFormProps) {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<EmailVerificationInput>({
        defaultValues: {
            email: 'vvictor.llin@gmail.com'
        },
        resolver: yupResolver(emailVerificationSchema)
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
                            onChangeText={field.onChange}
                            value={field.value}
                            _focus={{ borderColor: 'indigo.500' }}
                        />
                        <FormControl.ErrorMessage>
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
