import React from 'react'

import { Center } from 'native-base'

export default function AbsoluteOverlay({
    backgroundColor = 'white',
    children = null
}: {
    backgroundColor?: string
    children?: React.ReactNode
}) {
    return (
        <Center
            flex={1}
            backgroundColor={backgroundColor}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            {children}
        </Center>
    )
}
