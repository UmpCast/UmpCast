import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignInParamList } from '@/app/signin/utils/signInNavigation'
import { PublicParamList } from '@/app/public/utils/publicNavigation'
import { TempParamList } from '../utils/tempNavigation'

export type AppStackParamList = SignInParamList &
    PublicParamList &
    TempParamList

const AppStack = createNativeStackNavigator<AppStackParamList>()

export default AppStack
