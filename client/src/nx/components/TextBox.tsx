import { Box, Text, IBoxProps } from 'native-base'

interface Props extends IBoxProps {
    value: string
}

export default function TextBox({ value }: Props) {
    return (
        <Box p={3} bg="secondary.100" rounded="sm">
            <Text>{value}</Text>
        </Box>
    )
}
