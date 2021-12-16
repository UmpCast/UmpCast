export default {
    expo: {
        name:
            process.env.APP_ENV === 'development' ? 'UmpCast (DEV)' : 'UmpCast',
        slug: 'UmpCast',
        owner: 'umpcast',
        version: '1.0.0',
        sdkVersion: '43.0.0',
        runtimeVersion: '43.0',
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
            package:
                process.env.APP_ENV === 'development'
                    ? 'com.umpcast.umpcast_dev'
                    : 'com.umpcast.umpcast',
            versionCode: 2,
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
