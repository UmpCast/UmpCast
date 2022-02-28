import { AntDesign } from '@expo/vector-icons'
import { Icon, IIconProps } from 'native-base'

export default function OrganizationActionIcon(props: IIconProps) {
    return <Icon as={AntDesign} color="indigo.500" size={4} {...props} />
}
