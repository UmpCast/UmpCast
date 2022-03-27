import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuth, signOut } from 'firebase/auth'

export default function useAuthSignOut() {
    return async () => {
        await AsyncStorage.clear()
        await signOut(getAuth())
    }
}
