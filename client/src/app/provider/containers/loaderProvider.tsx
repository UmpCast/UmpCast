import React from 'react'

import * as Animatable from 'react-native-animatable'

import LoaderAlert from '../components/loaderAlert'
import LoaderOverlay from '../components/loaderOverlay'
import useAnimatedOverlay from '../hooks/useAnimatedOverlay'
import useLoaderSubscription, {
    LoaderPromiseWrapperFn
} from '../hooks/useLoaderSubscription'

export const LoaderSubscriptionContext =
    React.createContext<LoaderPromiseWrapperFn | null>(null)

export default function LoaderProvider({
    children
}: {
    children: JSX.Element
}) {
    const [subscribed, loaderStyles, loaderPromiseWrapper] =
        useLoaderSubscription()

    const [visible, animatableRef] = useAnimatedOverlay(subscribed, (view) =>
        view.zoomOut ? view.zoomOut() : Promise.resolve(true)
    )

    return (
        <LoaderSubscriptionContext.Provider value={loaderPromiseWrapper}>
            <LoaderOverlay
                showOverlay={visible}
                alert={
                    <Animatable.View ref={animatableRef} animation="zoomIn">
                        <LoaderAlert
                            icon={loaderStyles.icon}
                            title={loaderStyles.title}
                            message={loaderStyles.message}
                        />
                    </Animatable.View>
                }
            >
                {children}
            </LoaderOverlay>
        </LoaderSubscriptionContext.Provider>
    )
}
