import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type UnauthenticatedStackParamList = {
    VerificationSent: {
        email: string
    }
    EmailVerification: undefined
}

export const UnauthenticatedStack =
    createNativeStackNavigator<UnauthenticatedStackParamList>()
