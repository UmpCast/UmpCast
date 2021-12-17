import Constants from 'expo-constants'
export default Constants.manifest?.extra?.NODE_ENV === 'development'
    ? require('./src/AppDev')
    : require('./src/App')
