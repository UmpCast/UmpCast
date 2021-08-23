import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { VStack, FormControl } from 'native-base'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import TextInput from 'components/form/TextInput'

import { SignupFormProps } from '../models/SignupForm'
import SignupButton from './signupButton'
import SignupWrapper from './signupWrapper'

const fullNameSchema = yup.object().shape({
    firstName: yup.string().required().label('First name'),
    lastName: yup.string().required().label('Last name')
})

interface FullName extends yup.Asserts<typeof fullNameSchema> {}

export default function FullNameForm(props: SignupFormProps) {
    const { isLast } = props

    const { control, formState, handleSubmit } = useForm({
        resolver: yupResolver(fullNameSchema)
    })

    const onSubmit = (data: FullName) => props.onNext(data)

    return (
        <SignupWrapper title="Full Name">
            <VStack space={4}>
                <FormControl
                    isRequired
                    isInvalid={'firstName' in formState.errors}
                >
                    <FormControl.Label _text={{ bold: true }}>
                        First
                    </FormControl.Label>
                    <TextInput
                        control={control}
                        name="firstName"
                        rules={{ required: '' }}
                        defaultValue=""
                    />
                    <FormControl.ErrorMessage>
                        {formState.errors.firstName?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                    isRequired
                    isInvalid={'lastName' in formState.errors}
                >
                    <FormControl.Label _text={{ bold: true }}>
                        Last
                    </FormControl.Label>
                    <TextInput
                        control={control}
                        name="lastName"
                        rules={{ required: '' }}
                        defaultValue=""
                    />
                    <FormControl.ErrorMessage>
                        {formState.errors.lastName?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                <SignupButton
                    isLast={isLast}
                    onPress={handleSubmit(onSubmit)}
                />
            </VStack>
        </SignupWrapper>
    )
}
