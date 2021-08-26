import React from 'react'

import { PresenceTransition, Center } from 'native-base'

interface Props {
    loaderDisplay: JSX.Element
    children: JSX.Element | null
    overlayVisible: boolean
    loaderVisible: boolean
    onExit: () => void
}

export default function LoadingOverlay(props: Props) {
    const { loaderDisplay, loaderVisible, overlayVisible, onExit, children } =
        props

    return (
        <>
            {overlayVisible && (
                <Center
                    flex={1}
                    border="blue"
                    backgroundColor="white"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10
                    }}
                >
                    <PresenceTransition
                        initial={{
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                duration: 250
                            }
                        }}
                        visible={loaderVisible}
                        onTransitionComplete={(s) => {
                            if (s === 'exited') onExit()
                        }}
                    >
                        {loaderDisplay}
                    </PresenceTransition>
                </Center>
            )}
            {children}
        </>
    )
}
