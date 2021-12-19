import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UnauthStackParamList } from '../containers/UnauthStack'
import EmailVerifSentView from '../components/EmailVerifSentView'

type EmailVerifSentScreenProps = NativeStackScreenProps<
    UnauthStackParamList,
    'VerificationSent'
>

export default function EmailVerifSentScreen({
    route
}: EmailVerifSentScreenProps) {
    return <EmailVerifSentView email={route.params.email} />
}
