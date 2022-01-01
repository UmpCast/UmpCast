import { Button } from 'native-base'

export interface GenericSignInButtonProps {
    disabled: boolean
    onPress: () => any
    children: JSX.Element
}

export default function GenericSignInButton({
    disabled,
    onPress,
    children
}: GenericSignInButtonProps) {
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
