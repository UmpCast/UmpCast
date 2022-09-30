import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Icon, IIconProps } from 'native-base'

export default function MaterialIcon(props: IIconProps) {
    return <Icon as={MaterialCommunityIcons} {...props} />
}
