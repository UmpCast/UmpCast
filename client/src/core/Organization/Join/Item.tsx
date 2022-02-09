import { OrgInfoItemLayout } from '../Info/Item'
import { Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

export default function OrgJoinItem() {
    return (
        <OrgInfoItemLayout
            source={<Icon as={AntDesign} name="plus" color="indigo.500" />}
            title="Join Organization"
        />
    )
}
