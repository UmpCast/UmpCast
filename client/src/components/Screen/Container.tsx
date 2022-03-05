import { Box } from 'native-base'
import { ReactNode } from 'react'

export interface ScreenContainerProps {
    children: ReactNode
}

export default function ScreenContainer({ children }: ScreenContainerProps) {
    return <Box p={4}>{children}</Box>
}
