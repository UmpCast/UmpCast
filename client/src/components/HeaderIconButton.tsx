import MaterialIcon from './MaterialIcon'
import NxIconButton from './IconButton'

type Variant = 'primary' | 'secondary'

interface Props {
    name: string
    variant: Variant
    onPress: () => void
}

const variantRegistry: any = {
    primary: {
        variant: 'primary.ghost',
        color: 'primary.solid'
    },
    secondary: {
        variant: 'secondary.ghost',
        color: 'secondary.solid'
    }
}

export default function HeaderIconButton({ name, variant, onPress }: Props) {
    const variantProps = variantRegistry[variant]
    return (
        <NxIconButton
            variant={variantProps.variant}
            size="lg"
            onPress={onPress}
        >
            <MaterialIcon name={name} color={variantProps.color} size="lg" />
        </NxIconButton>
    )
}
