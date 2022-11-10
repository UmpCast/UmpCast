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

type Padding =
    | 'rect.lg'
    | 'rect.md'
    | 'rect.sm'
    | 'sqr.lg'
    | 'sqr.md'
    | 'sqr.sm'


const paddingRegistry: Record<Padding, IPressableProps> = {
    'rect.lg': {
        px: 4,
        py: 3
    },
    'rect.md': {
        px: 3,
        py: 2
    },
    'rect.sm': {
        px: 2,
        py: 1
    },
    'sqr.lg': {
        p: 3
    },
    'sqr.md': {
        p: 2
    },
    'sqr.sm': {
        p: 1
    }
}

export interface NxPressableProps extends IPressableProps {
    variant?: Variant | undefined
    padding?: Padding | undefined
}

export default function NxPressable({ variant, padding, ...props }: NxPressableProps) {
    const variantProp = variant && variantRegistry[variant]
    const paddingProp = padding && paddingRegistry[padding]

    return <Pressable {...variantProp} {...paddingProp} {...props} />
}
