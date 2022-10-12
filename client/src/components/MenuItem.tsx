import { HStack } from 'native-base'
import { ReactNode } from 'react'

interface Props {
    icon: ReactNode
    children: ReactNode
}

export default function IconOption({ children, icon }: Props) {
    return (
        <HStack alignItems="center" space="sm">
            {icon}
            {children}
        </HStack>
    )
}
