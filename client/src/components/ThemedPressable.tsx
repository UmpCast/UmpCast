import { IPressableProps, Pressable } from 'native-base'

type Variant =
    | 'secondary.ghost'
    | 'secondary.lite'
    | 'primary.ghost'
    | 'secondary.solid'

const variantRegistry: Record<Variant, IPressableProps> = {
    'secondary.ghost': {
        _pressed: {
            backgroundColor: 'secondary.subtle'
        }
    },
    'secondary.lite': {
        backgroundColor: 'secondary.lite',
        _pressed: {
            backgroundColor: 'secondary.subtle'
        }
    },
    'secondary.solid': {
        backgroundColor: 'secondary.mute',
        _pressed: {
            backgroundColor: 'secondary.solid'
        }
    },
    'primary.ghost': {
        _pressed: {
            backgroundColor: 'primary.lite'
        }
    }
}

export interface ThemedPressableProps extends IPressableProps {
    variant?: Variant
}

export default function ThemedPressable({
    variant,
    ...props
}: ThemedPressableProps) {
    const variantProp = variant && variantRegistry[variant]

    return <Pressable {...variantProp} {...props} />
}
