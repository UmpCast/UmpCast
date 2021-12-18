import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UnauthenticatedStackParamList } from './UnauthenticatedStack'
import VerificationSentText from '../components/VerificationSentText'

type ViewableVerificationSentTextProps = NativeStackScreenProps<
    UnauthenticatedStackParamList,
    'VerificationSent'
>

export default function ViewableVerificationSentText({
    route
}: ViewableVerificationSentTextProps) {
    return <VerificationSentText email={route.params.email} />
}
