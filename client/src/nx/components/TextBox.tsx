import { Box, IBoxProps } from 'native-base'

export const textBoxDefaultProps = {
    bg: 'secondary.100',
    p: 2.5,
    rounded: 'sm'
}

interface Props extends IBoxProps {}

export default function TextBox(props: Props) {
    return <Box {...textBoxDefaultProps} {...props} />
}
