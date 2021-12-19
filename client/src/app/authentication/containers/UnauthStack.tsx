import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type UnauthStackParamList = {
    VerificationSent: {
        email: string
    }
    EmailVerification: undefined
}

export const UnauthStack = createNativeStackNavigator<UnauthStackParamList>()
