import NxPressable, { NxPressableProps } from './NxPressable'

type Size = 'lg' | 'md' | 'sm'

const sizeRegistry = {
    lg: {
        p: 3
    },
    md: {
        p: 2
    },
    sm: {
        p: 1
    }
}

interface Props extends NxPressableProps {
    size?: Size
}

export default function NxIconButton({ size: size = 'md', ...rest }: Props) {
    const sizeProp = size && sizeRegistry[size]

    return <NxPressable rounded="full" {...sizeProp} {...rest} />
}
