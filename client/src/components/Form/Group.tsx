import { VStack } from 'native-base'
import { ReactNode } from 'react'

import FormErrorMessage from './ErrorMessage'

interface Props {
    label?: JSX.Element
    children: JSX.Element
    caption?: ReactNode
}

export default function Group({
    label,
    children,
    caption = <FormErrorMessage />
}: Props) {
    return (
        <VStack space={2}>
            {label}
            <VStack space={1}>
                {children}
                {caption}
            </VStack>
        </VStack>
    )
}
