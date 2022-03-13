import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useSendSignInLinkMutation } from '@/generated'
import useFormInputErrors from '@/hooks/useFormInputErrors'
import { loadAppExtra } from '@/utils/expo'
import { getActionCodeSettings } from '@/utils/firebase'

export type EmailSignInInput = {
    email: string
}

const emailSignInSchema = yup.object().shape({
    email: yup.string().email().required('email is required')
})

export interface SendLinkFormOptions {
    onSuccess: (input: EmailSignInInput) => void
}

export default function useAuthEmailLinkForm({
    onSuccess
}: SendLinkFormOptions) {
    const [_, sendSignInLink] = useSendSignInLinkMutation()

    const utils = useForm<EmailSignInInput>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(emailSignInSchema)
    })
    const setServerErrors = useFormInputErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input) => {
        const extra = loadAppExtra()
        const { data } = await sendSignInLink({
            input: {
                ...input,
                actionCodeSettings: getActionCodeSettings(extra)
            }
        })

        const errors = data?.sendSignInLink.errors

        if (errors?.length !== 0) {
            setServerErrors(errors)
            return
        }

        onSuccess(input)
    })

    return {
        ...utils,
        onSubmit
    }
}
