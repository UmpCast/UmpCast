import { Button } from 'native-base'

export interface SignInButtonProps {
    disabled: boolean
    onPress: () => any
    children: JSX.Element
}

export default function SignInButton({
    disabled,
    onPress,
    children
}: SignInButtonProps) {
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
