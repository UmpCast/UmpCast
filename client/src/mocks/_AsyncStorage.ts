import AsyncStorage from '@react-native-async-storage/async-storage'

import { EMAIL_SIGN_IN_KEY } from '@/constants'

function storedEmail(email: string) {
    AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, email)
}

export default {
    mock: {
        storedEmail
    },
    ...AsyncStorage
}
