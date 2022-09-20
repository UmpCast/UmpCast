import { IPressableProps, Pressable } from 'native-base'

type Size = 'lg' | 'md' | 'sm' | 'xs'

const sizeProps: Record<Size, IPressableProps> = {
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
        py: 0.5
    }
}

type ColorScheme = 'primary' | 'secondary' | 'danger'

type Variant = 'secondary.ghost' | 'secondary.subtle' | 'primary.ghost'

const variantProps: Record<Variant, IPressableProps> = {
    'secondary.ghost': {
        _pressed: {
            backgroundColor: 'secondary.200'
        }
    },
    'secondary.subtle': {
        backgroundColor: 'secondary.400',
        _pressed: {
            backgroundColor: 'secondary.200'
        }
    },
    'primary.ghost': {
        _pressed: {
            backgroundColor: 'primary.100'
        }
    }
}

export interface PressableXProps extends Omit<IPressableProps, 'sizes'> {
    size?: Size
    variant?: Variant
    colorScheme?: ColorScheme
}

export default function PressableX({
    variant,
    size,
    ...props
}: PressableXProps) {
    const sizeProp = size && sizeProps[size]
    const variantProp = variant && variantProps[variant]

    return <Pressable {...sizeProp} {...variantProp} {...props} />
}
