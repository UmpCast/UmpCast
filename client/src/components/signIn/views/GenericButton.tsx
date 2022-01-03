import { Button } from 'native-base'

export interface GenericButtonProps {
    disabled: boolean
    onPress: () => any
    children: JSX.Element
}

export default function GenericButton({
    disabled,
    onPress,
    children
}: GenericButtonProps) {
    return (
        <Button
            disabled={disabled}
            onPress={onPress}
            variant="outline"
            colorScheme="blueGray"
            borderWidth={2}
        >
            {children}
        </Button>
    )
}
