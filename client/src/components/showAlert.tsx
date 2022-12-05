import { Alert, AlertButton } from 'react-native'

interface Props {
    title: string
    description?: string
    buttons?: AlertButton[]
}

export default function showAlert({ title, description, buttons }: Props) {
    Alert.alert(title, description, buttons)
}
