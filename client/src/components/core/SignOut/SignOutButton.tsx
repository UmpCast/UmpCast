import useSignOut from '@/hooks/useSignOut'
import { Button } from 'native-base'

export default function SignOutButton() {
    const signOut = useSignOut()

    return <Button onPress={signOut}>Sign Out</Button>
}
