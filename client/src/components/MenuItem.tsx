import { HStack } from 'native-base'
import { ReactNode } from 'react'

interface Props {
    icon: ReactNode
    children: ReactNode
}

export default function MenuOption({ children, icon }: Props) {
    return (
        <HStack alignItems="center" space="sm">
            {icon}
            {children}
        </HStack>
    )
}
