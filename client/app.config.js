import 'dotenv/config'

export default {
    expo: {
        name: 'UmpCast',
        slug: 'UmpCast',
        owner: 'umpcast',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff'
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true
        },
        android: {
            package: 'com.umpcast.umpcast',
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF'
            }
        },
        web: {
            favicon: './assets/favicon.png'
        }
    }
}
