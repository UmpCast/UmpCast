import useSignOut from '@/hooks/useSignOut'
import { Link } from 'native-base'

export default function CancelLink() {
    const signOut = useSignOut()
    return <Link onPress={signOut}>Cancel Registration</Link>
}