import ThemedPressable, { ThemedPressableProps } from './ThemedPressable'

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

interface Props extends ThemedPressableProps {
    size?: Size
}

export default function NxIconButton({ size: size = 'md', ...rest }: Props) {
    const sizeProp = size && sizeRegistry[size]

    return <ThemedPressable rounded="full" {...sizeProp} {...rest} />
}
