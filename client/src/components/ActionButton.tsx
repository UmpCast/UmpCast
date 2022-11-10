import { Text } from 'native-base'
import NxButton from './NxButton'

interface Props {
    children: string
    onPress: () => void
    disabled?: boolean
}

export default function ActionButton({ children, onPress, disabled }: Props) {
    return (
        <NxButton
            variant="primary.ghost"
            onPress={onPress}
            disabled={disabled}
        >
            <Text bold color={disabled ? 'primary.subtle' : 'primary.solid'}>
                {children}
            </Text>
        </NxButton>
    )
}
