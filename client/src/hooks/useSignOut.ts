import {getAuth, signOut} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function () {
    return async () => {
        await AsyncStorage.clear()
        await signOut(getAuth())
    }
}