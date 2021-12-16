let build = {}

switch (process.env.APP_ENV) {
    case 'development':
        build.name = 'UmpCast (DEV)'
        build.androidPackage = 'com.umpcast.umpcast_dev'
        break
    case 'preview':
        build.name = 'UmpCast (TEST)'
        build.androidPackage = 'com.umpcast.umpcast_test'
        break
    case 'production':
    default:
        build.name = 'UmpCast'
        build.androidPackage = 'com.umpcast.umpcast'
        break
}

export default {
    expo: {
        name: build.name,
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
            fallbackToCacheTimeout: 30
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true
        },
        android: {
            package: build.androidPackage,
            versionCode: 3,
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
