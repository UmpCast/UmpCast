import React from 'react'

import { Center } from 'native-base'

interface Props {
    backgroundColor?: string
    children?: JSX.Element | null
}

export default function AbsoluteOverlay({
    backgroundColor = 'white',
    children = null
}: Props) {
    return (
        <Center
            flex={1}
            backgroundColor={backgroundColor}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10
            }}
        >
            {children}
        </Center>
    )
}
