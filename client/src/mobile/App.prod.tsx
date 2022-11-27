// import { NativeBaseProvider } from 'native-base'
// import {
//     cacheExchange,
//     createClient,
//     dedupExchange,
//     fetchExchange,
//     Provider as UrqlProvider
// } from 'urql'

// import authExchange from '@/config/urql/auth'

// import AppNavigationContainer from './navigation/Container'
// import { expoExtra } from '@/utils/expo'
// import TabsNavigator from './navigation/navigators/TabsNavigator'
// import { getNativeBaseTheme } from '@/config/nativeBase/theme'

// export const appClient = createClient({
//     url: `${expoExtra.SERVER_GRAPHQL_URL}/graphql`,
//     exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange]
// })

// export default function AppProd() {
//     const appTheme = getNativeBaseTheme("light")
//     return (
//         <UrqlProvider value={appClient}>
//             <NativeBaseProvider theme={appTheme}>
//                 <AppNavigationContainer>
//                     <TabsNavigator />
//                 </AppNavigationContainer>
//             </NativeBaseProvider>
//         </UrqlProvider>
//     )
// }


import AppDev from './dev/entry'

import { LogBox } from 'react-native'

LogBox.ignoreLogs(['EventEmitter.removeListener', "'SplashScreen"])

export default function () {
    return <AppDev />
}
