import { Box, Text, IBoxProps } from 'native-base'

interface Props extends IBoxProps {
    value: string
}

export default function TextBox({ value }: Props) {
    return (
        <Box bg="secondary.100" p={3} rounded="sm">
            <Text>{value}</Text>
        </Box>
    )
}
