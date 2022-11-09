import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TabsStackParamList } from "../TabsStack/types"


export const Stack = createNativeStackNavigator<TabsStackParamList>()