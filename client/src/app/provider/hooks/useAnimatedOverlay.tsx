import React, { useEffect, useRef, useState } from 'react'

import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'

export default function useAnimatedOverlay(
    subscribed: boolean,
    hidingAnimation: (view: Animatable.View & View) => Promise<any>
): [
    animating: boolean,
    animatableRef: React.RefObject<Animatable.View & View>
] {
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
