import 'dotenv/config'

export default {
    expo: {
        name: 'UmpCast',
        slug: 'umpcast',
        owner: 'umpcast',
        version: '1.0.0',
        orientation: 'portrait',
        entryPoint:
            process.env.NODE_ENV === 'development'
                ? 'src/AppDev.tsx'
                : 'src/App.tsx',
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
