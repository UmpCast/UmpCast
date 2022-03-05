import { ReactNode } from 'react'
import { Box } from 'native-base'

export interface ScreenContainerProps {
    children: ReactNode
}

export default function ScreenContainer({ children }: ScreenContainerProps) {
    return <Box p={4}>{children}</Box>
}
