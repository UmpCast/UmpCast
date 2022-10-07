import { Text } from 'native-base'

import PressableX from './PressableX'

interface Props {
    children: string
    onPress: () => void
    disabled?: boolean
}

export default function ActionButton({ children, onPress, disabled }: Props) {
    return (
        <PressableX
            onPress={onPress}
            rounded="sm"
            size="sm"
            variant="primary.ghost"
            disabled={disabled}
        >
            <Text bold color={disabled ? 'primary.subtle' : 'primary.solid'}>
                {children}
            </Text>
        </PressableX>
    )
}
