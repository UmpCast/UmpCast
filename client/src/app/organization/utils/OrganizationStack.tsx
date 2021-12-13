import { NavigationProp } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type OrganizationStackParamList = {
    OwnedOrganization: undefined
    CreateOrganization: undefined
}

const OrganizationStack =
    createNativeStackNavigator<OrganizationStackParamList>()

export type OrganizationStackNavigation =
    NavigationProp<OrganizationStackParamList>

export default OrganizationStack
