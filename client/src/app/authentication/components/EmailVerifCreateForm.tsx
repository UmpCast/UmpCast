import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { VStack, Button, FormControl, Input } from 'native-base'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import NBController from '@/app/common/containers/NBController'

export type EmailVerifCreateInput = {
    email: string
}

export interface EmailVerifCreateFormProps {
    onSubmit: (input: EmailVerifCreateInput) => Promise<any>
}

const emailVerifCreateSchema = yup.object().shape({
    email: yup.string().email().required()
})

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
