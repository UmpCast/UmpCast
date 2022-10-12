import { Pressable } from 'native-base'
import MaterialIcon from './MaterialIcon'

type Variant = 'primary' | 'secondary'

interface Props {
    name: string
    onPress: () => void
    variant: Variant
    size?: 'md' | 'lg'
}

const variantPropsRegistry: Record<Variant, any> = {
    secondary: {
        _pressed: {
            backgroundColor: 'secondary.lite'
        },
        textColor: 'secondary.solid'
    },
    primary: {
        _pressed: {
            backgroundColor: 'primary.lite'
        },
        textColor: 'primary.solid'
    }
}

export default function IconButton({ name, onPress, variant, size }: Props) {
    const variantProps = variantPropsRegistry[variant]

    return (
        <Pressable onPress={onPress} p={1.5} _pressed={variantProps._pressed} rounded="full">
            <MaterialIcon name={name} size={size} color={variantProps.textColor} />
        </Pressable>
    )
}
