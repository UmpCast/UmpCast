import { TypedNavigator } from '@react-navigation/native'

export interface GenericStack extends TypedNavigator<any, any, any, any, any> {}

export interface WrapperProps {
    children: JSX.Element
}

export interface AuthRequestResult {
    prepared: boolean
    login: () => Promise<any>
}
