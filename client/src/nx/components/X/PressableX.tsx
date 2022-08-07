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

type Variant = 'ghost' | 'solid' | 'subtle'

const variantProps: Record<Variant, (scheme: ColorScheme) => IPressableProps> =
    {
        ghost: (scheme) => ({
            _pressed: {
                backgroundColor: `${scheme}.focus`
            }
        }),
        solid: (scheme) => ({
            _pressed: {
                backgroundColor: `${scheme}.mute`
            },
            backgroundColor: `${scheme}.base`
        }),
        subtle: (scheme) => ({
            backgroundColor: `${scheme}.hover`,
            _pressed: {
                backgroundColor: `${scheme}.50`
            }
        })
    }

export interface PressableXProps extends Omit<IPressableProps, 'sizes'> {
    size?: Size
    variant?: Variant
    colorScheme?: ColorScheme
}

export default function PressableX({
    colorScheme = 'primary',
    variant,
    size,
    ...props
}: PressableXProps) {
    const sizeProp = size && sizeProps[size]
    const variantProp = variant && variantProps[variant](colorScheme)

    return <Pressable {...sizeProp} {...variantProp} {...props} />
}
