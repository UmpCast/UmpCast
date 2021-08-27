import React, { useEffect, useRef, useState } from 'react'

import { useQuery } from '@apollo/client'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'

import { IS_LOADER_SUBSCRIBED } from '../graphql/queries/isLoaderSubscribed'

export default function useOverlayVisible(
    hidingAnimation: (view: Animatable.View & View) => Promise<any>
): [
    animating: boolean,
    animatableRef: React.RefObject<Animatable.View & View>
] {
    const { data } = useQuery(IS_LOADER_SUBSCRIBED)
    const { subscribed } = data.loader

    const ref = useRef<Animatable.View & View>(null)
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        if (subscribed) {
            setVisible(true)
        } else if (ref.current?.fadeOut) {
            hidingAnimation(ref.current).then(() => setVisible(false))
        }
    }, [subscribed])

    return [visible, ref]
}
