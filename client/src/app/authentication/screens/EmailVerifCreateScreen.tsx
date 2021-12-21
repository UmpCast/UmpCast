import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import EmailVerifCreateForm from '../components/EmailVerifCreateForm'
import useSendEmailVerification from '../graphql/mutations/sendEmailVerification'
import { UnauthStackParamList } from '../containers/UnauthStack'
import { EmailVerifCreateInput } from '../utils/emailVerifCreateSchema'

type EmailVerifCreateScreenProps = NativeStackScreenProps<
    UnauthStackParamList,
    'EmailVerification'
>

export default function EmailVerifCreateScreen({
    navigation
}: EmailVerifCreateScreenProps) {
    const [sendEmailVerification] = useSendEmailVerification()

    const onEmailVerifSubmit = async ({ email }: EmailVerifCreateInput) => {
        await sendEmailVerification({
            variables: {
                input: {
                    email
                },
                route: '/verify'
            }
        })

        navigation.navigate({
            name: 'VerificationSent',
            params: {
                email
            }
        })
    }

    return <EmailVerifCreateForm onSubmit={onEmailVerifSubmit} />
}
