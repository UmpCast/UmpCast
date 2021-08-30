import React from 'react'

import { Spinner } from 'native-base'

import Logo from 'assets/logo'

import { LoaderIcon } from '../models/Loader'

export function LoaderIconRender({
    icon,
    size = 100
}: {
    icon: LoaderIcon
    size?: number
}): JSX.Element {
    switch (icon) {
        case 'static':
            return <Logo width={size} height={size} />
        case 'spinner':
            return <Spinner size={size} />
        default:
            return <Logo width={size} height={size} />
    }
}
