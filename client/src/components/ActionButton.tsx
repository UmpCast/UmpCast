import { Text } from 'native-base'
import TextPressable from './TextPressable'

interface Props {
    children: string
    onPress: () => void
    disabled?: boolean
}

export default function ActionButton({ children, onPress, disabled }: Props) {
    return (
        <TextPressable
            size="md"
            variant="primary.ghost"
            onPress={onPress}
            disabled={disabled}
        >
            <Text bold color={disabled ? 'primary.subtle' : 'primary.solid'}>
                {children}
            </Text>
        </TextPressable>
    )
}
