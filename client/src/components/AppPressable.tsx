import { IPressableProps, Pressable } from 'native-base'

type Size = 'lg' | 'md' | 'sm' | 'xs'

const sizePropRegistry: Record<Size, IPressableProps> = {
    lg: {
        px: 4,
        py: 3
    },
    md: {
        px: 4,
        py: 2
    },
    sm: {
        px: 2,
        py: 1
    },
    xs: {
        px: 1,
        py: 0
    }
}

type Variant =
    | 'secondary.ghost'
    | 'secondary.subtle'
    | 'primary.ghost'
    | 'secondary.solid'

const variantPropRegistry: Record<Variant, IPressableProps> = {
    'secondary.ghost': {
        _pressed: {
            backgroundColor: 'secondary.subtle'
        }
    },
    'secondary.subtle': {
        backgroundColor: 'secondary.lite',
        _pressed: {
            backgroundColor: 'secondary.subtle'
        }
    },
    'secondary.solid': {
        backgroundColor: 'secondary.400',
        _pressed: {
            backgroundColor: 'secondary.700'
        }
    },
    'primary.ghost': {
        _pressed: {
            backgroundColor: 'primary.lite'
        }
    }
}

export interface AppPressableProps extends Omit<IPressableProps, 'sizes'> {
    size?: Size
    variant?: Variant
}

export default function AppPressable({
    variant,
    size,
    ...props
}: AppPressableProps) {
    const sizeProp = size && sizePropRegistry[size]
    const variantProp = variant && variantPropRegistry[variant]

    return <Pressable {...sizeProp} {...variantProp} rounded="sm" {...props} />
}
