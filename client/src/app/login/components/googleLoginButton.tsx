import React from 'react'

import { Button } from 'native-base'

export default function GoogleLoginButton({
    disabled,
    onPress
}: {
    disabled: boolean
    onPress: () => void
}) {
    return (
        <Button disabled={disabled} onPress={onPress}>
            Login with Google
        </Button>
    )
}
