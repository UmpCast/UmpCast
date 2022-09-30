import { Text } from 'native-base'

export interface FormLabelProps {
    children: string
}

export default function FormLabel({ children }: FormLabelProps) {
    return <Text bold>{children}</Text>
}
