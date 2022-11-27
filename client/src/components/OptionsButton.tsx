import MaterialIcon from './MaterialIcon'
import ThemedPressable from './ThemedPressable'

interface Props {
    onPress: () => void
}

export default function OptionsButton({ onPress }: Props) {
    return (
        <ThemedPressable
            borderRadius="full"
            onPress={onPress}
            p={1}
            variant="secondary.ghost"
        >
            <MaterialIcon name="dots-horizontal" size="lg" />
        </ThemedPressable>
    )
}
