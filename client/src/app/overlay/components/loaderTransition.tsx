import React from 'react'

import { PresenceTransition } from 'native-base'

interface Props {
    type: 'scale' | 'opacity'
    visible: boolean
    onExit: () => void
    children: JSX.Element | null
}

export default function LoaderTransition({
    type,
    visible,
    onExit,
    children = null
}: Props) {
    return (
        <PresenceTransition
            initial={{
                [type]: 0
            }}
            animate={{
                [type]: 1,
                transition: {
                    duration: 500
                }
            }}
            visible={visible}
            onTransitionComplete={(s) => {
                if (s === 'exited') onExit()
            }}
        >
            {children}
        </PresenceTransition>
    )
}
