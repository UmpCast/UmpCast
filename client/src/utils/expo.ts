import { GoogleAuthRequestConfig } from 'expo-auth-session'
import Constants from 'expo-constants'

export interface ExpoExtra {
    FIREBASE_CONFIG: {
        apiKey: string
        appId: string
        authDomain: string
        measurementId: string
        messagingSenderId: string
        projectId: string
        storageBucket: string
    }
    GOOGLE_AUTH_CONFIG: Partial<GoogleAuthRequestConfig>
    NODE_ENV: string
    SERVER_GRAPHQL_URL: string
}

// manifest2 is a backup

export const expoExtra = (
    Constants.manifest ?? Constants.manifest2?.extra?.expoClient
)?.extra as ExpoExtra
