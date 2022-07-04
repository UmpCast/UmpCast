import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthSignInSendEmailLinkMutation } from '@/graphql/generated'
import useFormInputErrors from '@/hooks/useFormInputErrors'
import { loadAppExtra } from '@/utils/expo'
import { getActionCodeSettings } from '@/utils/firebase'

export type AuthLoginSendEmailLinkInput = {
    email: string
}

const authLoginSendEmailLinkFormSchema = yup.object().shape({
    email: yup.string().email().required('email is required')
})

export interface SendLinkFormOptions {
    onSuccess: (input: AuthLoginSendEmailLinkInput) => void
}

export default function useAuthLoginSendEmailLinkForm({
    onSuccess
}: SendLinkFormOptions) {
    const [_, sendLoginLink] = useAuthSignInSendEmailLinkMutation()

    const utils = useForm<AuthLoginSendEmailLinkInput>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(authLoginSendEmailLinkFormSchema)
    })
    const setServerErrors = useFormInputErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input) => {
        const extra = loadAppExtra()
        const { data } = await sendLoginLink({
            input: {
                ...input,
                actionCodeSettings: getActionCodeSettings(extra)
            }
        })

        const errors = data?.sendSignInLink?.errors

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
