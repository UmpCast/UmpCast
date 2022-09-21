import PressableX from './PressableX'
import { Text } from 'native-base'

interface Props {
    children: string
    onPress: () => void
}
export default function ActionButton({ children, onPress }: Props) {
    return (
        <PressableX onPress={onPress} rounded="sm" size="sm" variant="primary.ghost">
            <Text bold color="primary.600">
                {children}
            </Text>
        </PressableX>
    )
}
