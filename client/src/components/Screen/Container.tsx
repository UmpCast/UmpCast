import { Box, IBoxProps } from 'native-base'
import { ReactNode } from 'react'

export interface ScreenContainerProps extends IBoxProps {}
export default function ScreenContainer({
    children,
    ...rest
}: ScreenContainerProps) {
    return (
        <Box p={4} {...rest}>
            {children}
        </Box>
    )
}
