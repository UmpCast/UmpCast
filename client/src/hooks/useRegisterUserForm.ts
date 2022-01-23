import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useRegisterUserMutation } from '@/generated'

import useSetInputErrors from './useSetInputErrors'

export interface RegisterUserInput
    extends Record<
        | 'firstName'
        | 'lastName'
        | 'streetAddress'
        | 'city'
        | 'state'
        | 'zipCode'
        | 'phoneNumber',
        string
    > {}

const registerUserSchema = yup.object().shape({
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('last name is required'),
    streetAddress: yup.string().required('street address is required'),
    city: yup.string().required('city is required'),
    state: yup.string().required('state is required'),
    zipCode: yup
        .string()
        .required('zip code is required')
        .matches(/^\d{5}$/, 'zip code must be 5 digits'),
    phoneNumber: yup
        .string()
        .required('phone number is required')
        .matches(/^\d{10}$/, 'phone number must be 10 digits')
})

export default () => {
    const [_, registerUser] = useRegisterUserMutation()

    const utils = useForm<RegisterUserInput>({
        defaultValues: {
            firstName: '',
            lastName: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            phoneNumber: ''
        },
        resolver: yupResolver(registerUserSchema)
    })
    const setInputErrors = useSetInputErrors(utils.setError)

    const { handleSubmit } = utils

    const submitRegisterUser = handleSubmit(async (input) => {
        const registerUserInput = {
            ...input,
            zipCode: Number(input.zipCode),
            phoneNumber: Number(input.phoneNumber)
        }
        const { data } = await registerUser({
            input: registerUserInput
        })

        if (!data) return

        setInputErrors(data.register.errors)
    })

    return {
        ...utils,
        submitRegisterUser
    }
}