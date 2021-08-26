import React from 'react'

import { Spinner, Heading, Text, VStack } from 'native-base'

import Logo from 'assets/logo.svg'

import { LOADER_ICON_SIZE } from '../constants'
import { LoaderIcon } from '../models/Loader'

interface Props {
    icon?: LoaderIcon
    title?: string
    message?: string
    iconSize?: number
}

export function getLoaderIcon(icon: LoaderIcon, size: number): JSX.Element {
    switch (icon) {
        case 'static':
            return <Logo width={size} height={size} />
        case 'spinner':
            return <Spinner size={size} />
        default:
            return <Logo width={size} height={size} />
    }
}

export default function LoaderDisplay(props: Props) {
    const {
        icon = 'static',
        iconSize = LOADER_ICON_SIZE,
        title,
        message
    } = props

    const loaderIcon = getLoaderIcon(icon, iconSize)

    return (
        <VStack space={3} alignItems="center">
            {loaderIcon}
            {title && <Heading>{title}</Heading>}
            {message && <Text>{message}</Text>}
        </VStack>
    )
}
