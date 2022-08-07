import { Box, IBoxProps } from 'native-base'

interface Props extends IBoxProps {}

export default function TextBox(props: Props) {
    return <Box bg="secondary.hover" p={2.5} rounded="sm" {...props} />
}
