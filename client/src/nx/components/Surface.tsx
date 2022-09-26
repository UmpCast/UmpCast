import { Box, IBoxProps } from 'native-base'

interface Props extends IBoxProps {}

export default function Surface(props: Props) {
    return <Box bg="secondary.lite" p={2.5} rounded="sm" {...props} />
}
