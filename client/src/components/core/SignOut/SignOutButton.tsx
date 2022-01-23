import { Button } from 'native-base'

import useSignOut from '@/hooks/useSignOut'

export default function SignOutButton() {
    const signOut = useSignOut()

    return <Button onPress={signOut}>Sign Out</Button>
}
