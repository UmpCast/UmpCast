import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import EmailVerificationForm, {
    EmailVerificationInput
} from '../components/EmailVerificationForm'
import useSendEmailVerification from '../graphql/mutations/sendEmailVerification'
import { UnauthenticatedStackParamList } from './UnauthenticatedStack'

type EmailVerificationScreenProps = NativeStackScreenProps<
    UnauthenticatedStackParamList,
    'EmailVerification'
>

export default function SubmittableEmailVerificationForm({
    navigation
}: EmailVerificationScreenProps) {
    const [sendEmailVerification] = useSendEmailVerification()

    const onEmailVerificationSubmit = async ({
        email
    }: EmailVerificationInput) => {
        await sendEmailVerification({
            variables: {
                input: {
                    email,
                    route: '/verify'
                }
            }
        })

        navigation.navigate({
            name: 'VerificationSent',
            params: {
                email
            }
        })
    }

    return <EmailVerificationForm onSubmit={onEmailVerificationSubmit} />
}
