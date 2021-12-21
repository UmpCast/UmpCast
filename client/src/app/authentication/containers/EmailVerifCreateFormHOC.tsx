import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import emailVerifCreateSchema, {
    EmailVerifCreateInput
} from '../utils/emailVerifCreateSchema'
import EmailVerifCreateForm from '../components/EmailVerifCreateForm'
import useSendEmailVerification from '../graphql/mutations/sendEmailVerification'
import { UnauthStackParamList } from './UnauthStack'

type EmailVerificationNavigationProp = NativeStackNavigationProp<
    UnauthStackParamList,
    'EmailVerification'
>

export default function EmailVerifCreateFormHOC() {
    const navigation = useNavigation<EmailVerificationNavigationProp>()
    const [sendEmailVerif] = useSendEmailVerification()
    const { control, handleSubmit, setError, formState } =
        useForm<EmailVerifCreateInput>({
            defaultValues: {
                email: ''
            },
            resolver: yupResolver(emailVerifCreateSchema)
        })

    const onEmailVerifCreateSubmit = handleSubmit(async (input) => {
        const { data } = await sendEmailVerif({
            variables: {
                input,
                route: '/verify'
            }
        })
        if (!data) return

        const { sendEmailVerification: res } = data

        if (res.errors) {
            res.errors.forEach((err) => {
                setError(err.key, {
                    message: err.message
                })
            })
            return
        }

        navigation.navigate({
            name: 'VerificationSent',
            params: {
                email: input.email
            }
        })
    })

    return (
        <EmailVerifCreateForm
            control={control}
            formState={formState}
            onSubmit={onEmailVerifCreateSubmit}
        />
    )
}
