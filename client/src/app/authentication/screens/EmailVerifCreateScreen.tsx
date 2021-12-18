import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import EmailVerifCreateForm, {
    EmailVerifCreateInput
} from '../components/EmailVerifCreateForm'
import useSendEmailVerification from '../graphql/mutations/sendEmailVerification'
import { UnauthStackParamList } from '../containers/UnauthStack'

type EmailVerifCreateScreenProps = NativeStackScreenProps<
    UnauthStackParamList,
    'EmailVerification'
>

export default function EmailVerifCreateScreen({
    navigation
}: EmailVerifCreateScreenProps) {
    const [sendEmailVerification] = useSendEmailVerification()

    const onEmailVerificationSubmit = async ({
        email
    }: EmailVerifCreateInput) => {
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

    return <EmailVerifCreateForm onSubmit={onEmailVerificationSubmit} />
}
