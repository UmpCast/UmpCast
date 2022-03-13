import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuth, signOut } from 'firebase/auth'

export default () => async () => {
    await AsyncStorage.clear()
    await signOut(getAuth())
}
