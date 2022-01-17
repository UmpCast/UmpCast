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
            borderWidth={2}
            colorScheme="blueGray"
            disabled={disabled}
            onPress={onPress}
            variant="outline"
        >
            {children}
        </Button>
    )
}
