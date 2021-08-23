import React from 'react'

import { Button } from 'native-base'

interface Props {
    isLast: boolean
    onPress: () => any
}

export default function SignupButton(props: Props) {
    const { onPress, isLast } = props

    return <Button onPress={onPress}>{isLast ? 'Submit' : 'Next'}</Button>
}
