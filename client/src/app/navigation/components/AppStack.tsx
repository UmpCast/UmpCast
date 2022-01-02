import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignInParamList } from '@/app/signin/utils/signInNavigation'
import { PublicParamList } from '@/app/public/utils/publicNavigation'

export type AppStackParamList = SignInParamList & PublicParamList

const AppStack = createNativeStackNavigator<AppStackParamList>()

export default AppStack
