import getBuild from '@/app/app/utils/appBuild'
import { runtimeVersion, versionCode } from './app.build.json'

const build = getBuild()

export default {
    expo: {
        name: build.name,
        scheme: build.appScheme,
        currentFullName: '@umpcast/UmpCast',
        originalFullName: '@umpcast/UmpCast',
        facebookScheme: 'fb946144599651720',
        slug: 'UmpCast',
        owner: 'umpcast',
        version: '1.0.0',
        runtimeVersion,
        orientation: 'portrait',
        icon: './assets/icon.png',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff'
        },
        updates: {
            fallbackToCacheTimeout: 30
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true
        },
        android: {
            package: build.androidPackage,
            versionCode,
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF'
            },
            intentFilters: [
                {
                    action: 'VIEW',
                    autoVerify: true,
                    data: build.intentFilterURLS,
                    category: ['BROWSABLE', 'DEFAULT']
                }
            ]
        },
        web: {
            favicon: './assets/favicon.png'
        },
        extra: build.extra
    }
}
