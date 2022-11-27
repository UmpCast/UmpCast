import { HStack } from 'native-base'
import { ReactNode } from 'react'

import MaterialIcon from './MaterialIcon'

interface Props {
    children: ReactNode
    extra?: ReactNode
}

export default function Navigable({ children, extra }: Props) {
    return (
        <HStack alignItems="center" justifyContent="space-between">
            {children}
            <HStack alignItems="center" space="sm">
                {extra}
                <MaterialIcon color="primary.solid" name="chevron-right" />
            </HStack>
        </HStack>
    )
}
