import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignInParamList } from '@/app/signin/utils/signInNavigation'

export type AppStackParamList = SignInParamList

const AppStack = createNativeStackNavigator<SignInParamList>()

export default AppStack
