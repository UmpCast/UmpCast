import MaterialIcon from './MaterialIcon'
import PressableX from './PressableX'

interface Props {
    onPress: () => void
}

export default function OptionsButton({ onPress }: Props) {
    return (
        <PressableX borderRadius="full" onPress={onPress} size="icon" variant="secondary.ghost">
            <MaterialIcon name="dots-horizontal" size="lg" />
        </PressableX>
    )
}
