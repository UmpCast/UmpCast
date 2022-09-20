import { Button, IButtonProps } from 'native-base'

export default function AuthLoginButton(props: IButtonProps) {
    return <Button borderWidth={2} colorScheme="blueGray" variant="outline" {...props} />
}
