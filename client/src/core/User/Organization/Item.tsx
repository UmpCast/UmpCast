import { PressableIconItem } from '@/components/Pressable/IconItem'
import { AntDesign } from '@expo/vector-icons'
import { Icon } from 'native-base'

export default function UserOrganizationItem() {
    return (
        <PressableIconItem
            title="Palo Alto Little League"
            content={
                <Icon
                    size="20px"
                    name="questioncircleo"
                    as={AntDesign}
                    color="indigo.500"
                />
            }
        />
    )
}
