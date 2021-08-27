import React from 'react'

import { useQuery } from '@apollo/client'
import * as Animatable from 'react-native-animatable'

import LoaderAlert from '../components/loaderAlert'
import LoaderOverlay from '../components/loaderOverlay'
import { GET_LOADER_STYLES } from '../graphql/queries/getLoaderStyles'
import useOverlayVisible from '../hooks/useOverlayVisible'

export default function LoaderProvider({
    children
}: {
    children: JSX.Element
}) {
    const { data } = useQuery(GET_LOADER_STYLES)
    const { styles } = data.loader

    const [visible, animatableRef] = useOverlayVisible((view) =>
        view.zoomOut ? view.zoomOut() : Promise.resolve(true)
    )

    return (
        <LoaderOverlay
            showOverlay={visible}
            alert={
                <Animatable.View ref={animatableRef} animation="zoomIn">
                    <LoaderAlert
                        icon={styles.icon}
                        title={styles.title}
                        message={styles.message}
                    />
                </Animatable.View>
            }
        >
            {children}
        </LoaderOverlay>
    )
}
