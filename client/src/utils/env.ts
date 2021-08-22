import Constants from 'expo-constants';

interface AppConfig {
    serverUri: string
}

function environmentConfig(nodeEnv: string): AppConfig {
  switch (nodeEnv) {
    case 'development':
      return Constants.manifest?.extra?.DEVELOPMENT
    case 'production':
    default:
      return Constants.manifest?.extra?.PRODUCTION
  }
}

const appConfig = environmentConfig(process.env.NODE_ENV || 'production')

export default appConfig
