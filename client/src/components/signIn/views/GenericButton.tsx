import { Button } from 'native-base'

export interface SignInGenericButtonProps {
    disabled: boolean
    onPress: () => any
    children: JSX.Element
}

export default function SignInGenericButton({
    disabled,
    onPress,
    children
}: SignInGenericButtonProps) {
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
