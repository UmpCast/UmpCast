import { Box, IBoxProps } from 'native-base'

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
