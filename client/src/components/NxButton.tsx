import NxPressable, { NxPressableProps } from './NxPressable'

type Size = 'lg' | 'md' | 'sm' 

const sizeRegistry = {
    'lg': {
        px: 3,
        py: 2,
        rounded: 'sm'
    },
    'md': {
        px: 2,
        py: 1,
        rounded: 'sm'
    },
    'sm': {
        px: 1,
        py: 0,
        rounded: 'sm'
    }
}

interface Props extends NxPressableProps {
    size?: Size
}

export default function NxButton({ size = "md", ...rest }: Props) {
    const sizeProp = size && sizeRegistry[size]

    return <NxPressable {...sizeProp} {...rest} />
}