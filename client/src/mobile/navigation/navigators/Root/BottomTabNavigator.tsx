import { Feather } from '@expo/vector-icons'
import { Icon } from 'native-base'

import MeScreen from '@/mobile/screens/Me'

import { RootBottomTab, RootBottomTabRoute } from './BottomTab'

export default function AppBottomNavigator() {
    return <RootBottomTab.Navigator>
        <RootBottomTab.Screen
        name={RootBottomTabRoute.Home}
        />
    </RootBottomTab.Navigator>
}
