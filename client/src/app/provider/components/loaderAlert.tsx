import React from 'react'

import { Heading, Text, VStack } from 'native-base'

import { LoaderIcon } from '../models/Loader'
import { LoaderIconRender } from './loaderIconRender'

export default function LoaderAlert({
    icon,
    title,
    message,
    iconSize
}: {
    icon: LoaderIcon
    title: string | null
    message: string | null
    iconSize?: number
}) {
    return (
        <VStack space={3} alignItems="center">
            <LoaderIconRender icon={icon} size={iconSize} />
            {title && <Heading>{title}</Heading>}
            {message && <Text>{message}</Text>}
        </VStack>
    )
}
