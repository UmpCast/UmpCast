import { SignInParamList } from '@/app/signin/utils/signInNavigation'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type AppStackParamList = SignInParamList

const AppStack = createNativeStackNavigator<SignInParamList>()

export default AppStack
