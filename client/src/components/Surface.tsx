import { Box, IBoxProps } from 'native-base'

type Props = IBoxProps

export default function Surface(props: Props) {
    return <Box bg="secondary.lite" p={2.5} rounded="sm" {...props} />
}
