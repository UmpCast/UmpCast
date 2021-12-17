import Constants from 'expo-constants'

export interface AppExtra {
    NODE_ENV: string
    FIREBASE_CONFIG: {}
    ANDROID_PACKAGE: string
    DYNAMIC_LINK_DOMAIN: string
    APP_DOMAIN: string
}

export interface AppBuild {
    name: string
    androidPackage: string
    extra: AppExtra
}

export const loadAppExtra = () => Constants.manifest?.extra as AppExtra
