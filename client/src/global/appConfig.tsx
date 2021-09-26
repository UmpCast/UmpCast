import Constants from 'expo-constants'

interface Config {
    serverUri: string
}

function environmentConfig(nodeEnv: string): Config {
    switch (nodeEnv) {
        case 'development':
            return Constants.manifest?.extra?.DEVELOPMENT
        case 'production':
        default:
            return Constants.manifest?.extra?.PRODUCTION
    }
}

const AppConfig = environmentConfig(process.env.NODE_ENV || 'production')

export default AppConfig
