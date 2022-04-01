import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { CreateUserInput, useRegisterUserMutation } from '@/generated'
import useFormInputErrors from '@/hooks/useFormInputErrors'

const registerUserSchema = yup.object().shape({
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('last name is required'),
    phoneNumber: yup.string().matches(/^\d{10}$/, {
        message: 'phone number must be 10 digits',
        excludeEmptyString: true
    })
})

export default function useUserRegisterForm() {
    const [_, registerUser] = useRegisterUserMutation()

    const utils = useForm<CreateUserInput>({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: ''
        },
        resolver: yupResolver(registerUserSchema)
    })
    const setServerErrors = useFormInputErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input) => {
        const { phoneNumber, ...rest } = input
        const { data } = await registerUser({
            input: {
                ...rest,
                phoneNumber: phoneNumber === '' ? null : phoneNumber
            }
        })

        const errors = data?.createUser?.errors

        if (errors?.length !== 0) {
            setServerErrors(errors)
        }
    })

    return {
        ...utils,
        onSubmit
    }
}
