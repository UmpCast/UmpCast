import { IPressableProps, Pressable } from 'native-base'

type Size = 'xl' | 'lg' | 'md' | 'sm'

const sizeProps: Record<Size, IPressableProps> = {
    xl: {
        px: 4,
        py: 3,
        rounded: 'md'
    },
    lg: {
        px: 4,
        py: 2,
        rounded: 'md'
    },
    md: {
        px: 2,
        py: 1,
        rounded: 'sm'
    },
    sm: {
        px: 1,
        py: 0.5,
        rounded: 'sm'
    }
}

type ColorScheme = 'primary' | 'secondary'

type Variant = 'ghost'

const variantProps: Record<Variant, (scheme: ColorScheme) => IPressableProps> =
    {
        ghost: (scheme) => ({
            _pressed: {
                backgroundColor:
                    scheme === 'primary' ? 'primary.100' : 'secondary.200'
            }
        })
    }

export interface PressableXProps extends Omit<IPressableProps, 'sizes'> {
    size?: Size
    variant?: Variant
    colorScheme?: ColorScheme
}

export default function PressableX({
    size,
    colorScheme = 'primary',
    variant,
    ...props
}: PressableXProps) {
    const sizeProp = size && sizeProps[size]
    const variantProp =
        colorScheme && variant && variantProps[variant](colorScheme)

    return <Pressable {...variantProp} {...sizeProp} {...props} />
}
