import AppPressable from './AppPressable'
import MaterialIcon from './MaterialIcon'

interface Props {
    onPress: () => void
}

export default function OptionsButton({ onPress }: Props) {
    return (
        <AppPressable
            borderRadius="full"
            onPress={onPress}
            p={1}
            variant="secondary.ghost"
        >
            <MaterialIcon name="dots-horizontal" size="lg" />
        </AppPressable>
    )
}
