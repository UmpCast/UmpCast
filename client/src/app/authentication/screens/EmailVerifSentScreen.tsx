import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UnauthStackParamList } from '../containers/UnauthStack'
import EmailVerifSentView from '../components/EmailVerifSentView'

type ViewableVerificationSentTextProps = NativeStackScreenProps<
    UnauthStackParamList,
    'VerificationSent'
>

export default function ViewableVerificationSentText({
    route
}: ViewableVerificationSentTextProps) {
    return <EmailVerifSentView email={route.params.email} />
}
