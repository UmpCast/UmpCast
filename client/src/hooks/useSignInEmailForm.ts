import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useSendSignInLinkMutation } from '@/generated'
import { loadAppExtra } from '@/utils/expo'
import { getActionCodeSettings } from '@/utils/firebase'

import useSetInputErrors from './useSetInputErrors'

export type EmailSignInInput = {
    email: string
}

const emailSignInSchema = yup.object().shape({
    email: yup.string().email().required()
})

export default function useSignInEmailForm() {
    const [_, sendSignInLink] = useSendSignInLinkMutation()

    const utils = useForm<EmailSignInInput>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(emailSignInSchema)
    })
    const { handleSubmit, setError } = utils

    const setInputErrors = useSetInputErrors(setError)

    const handleSendEmail = (
        successCallback: (input: EmailSignInInput) => any
    ) =>
        handleSubmit(async (input) => {
            const extra = loadAppExtra()
            const { data } = await sendSignInLink({
                email: input.email,
                actionCodeSettings: getActionCodeSettings(extra)
            })

            if (!data) return false

            const { sendSignInLink: res } = data

            if (res.errors) {
                setInputErrors(res.errors)
                return false
            }

            return successCallback(input)
        })

    return {
        ...utils,
        handleSendEmail
    }
}
