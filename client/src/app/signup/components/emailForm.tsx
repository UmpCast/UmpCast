import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { VStack, FormControl } from 'native-base'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import TextInput from 'components/form/TextInput'

import { SignupFormProps } from '../models/SignupForm'
import SignupButton from './signupButton'
import SignupWrapper from './signupWrapper'

const emailSchema = yup.object().shape({
    email: yup.string().email().required().label('Email')
})

interface Email extends yup.Asserts<typeof emailSchema> {}

export default function EmailForm(props: SignupFormProps) {
    const { isLast } = props

    const { control, formState, handleSubmit } = useForm({
        resolver: yupResolver(emailSchema)
    })

    const onSubmit = (data: Email) => props.onNext(data)

    return (
        <SignupWrapper title="Email">
            <VStack space={4}>
                <FormControl isRequired isInvalid={'email' in formState.errors}>
                    <TextInput control={control} name="email" defaultValue="" />
                    <FormControl.ErrorMessage>
                        {formState.errors.email?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
            </VStack>
            <SignupButton isLast={isLast} onPress={handleSubmit(onSubmit)} />
        </SignupWrapper>
    )
}
