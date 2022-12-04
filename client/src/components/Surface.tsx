import { Box, IBoxProps } from 'native-base'

type Props = IBoxProps

export const surfaceProps = {
    p: 2.5,
    rounded: 'sm',
    backgroundColor: 'secondary.lite'
}

export default function Surface(props: Props) {
    return <Box {...surfaceProps} {...props} />
}
