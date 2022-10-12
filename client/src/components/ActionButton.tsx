import { Text } from 'native-base'

import AppPressable from './AppPressable'

interface Props {
    children: string
    onPress: () => void
    disabled?: boolean
}

export default function ActionButton({ children, onPress, disabled }: Props) {
    return (
        <AppPressable
            onPress={onPress}
            rounded="sm"
            size="sm"
            variant="primary.ghost"
            disabled={disabled}
        >
            <Text bold color={disabled ? 'primary.subtle' : 'primary.solid'}>
                {children}
            </Text>
        </AppPressable>
    )
}
