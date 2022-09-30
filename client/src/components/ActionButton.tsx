import { Text } from 'native-base'

import PressableX from './PressableX'

interface Props {
    children: string
    onPress: () => void
}
export default function ActionButton({ children, onPress }: Props) {
    return (
        <PressableX onPress={onPress} rounded="sm" size="sm" variant="primary.ghost">
            <Text bold color="primary.solid">
                {children}
            </Text>
        </PressableX>
    )
}
