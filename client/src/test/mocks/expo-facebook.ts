import * as expoFacebook from 'expo-facebook'
import { mocked } from 'jest-mock'

const mExpoFacebook = mocked(expoFacebook, true)

export default {
    ...mExpoFacebook
}
