import Constants from 'expo-constants'

export interface AppExtra {
    ANDROID_MINIMUM_VERSION: string
    APP_PACKAGE_NAME: string
    APP_NAME: string
    APP_SCHEME: string
    APP_URL: string
    DYNAMIC_LINK_DOMAIN: string
    FACEBOOK_CLIENT_ID: string
    FACEBOOK_DISPLAY_NAME: string
    FIREBASE_CONFIG: {}
    FIREBASE_AUTH_URL: string
    GOOGLE_CLIENT_ID: string
    INTENT_FILTER_DATA: {}
    NODE_ENV: string
    SERVER_GRAPHQL_URL: string
}

export const loadAppExtra = () => Constants.manifest?.extra as AppExtra