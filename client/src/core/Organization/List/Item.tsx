import { PressableIconItem } from '@/components/Pressable/IconItem'
import { AntDesign } from '@expo/vector-icons'
import { Icon, Image } from 'native-base'

export interface OrganizationListItemProps {
    title?: string | null
    pictureUrl?: string | null
}

export default function OrganizationListItem({
    title,
    pictureUrl
}: OrganizationListItemProps) {
    return (
        <PressableIconItem
            title={title || 'N/A'}
            content={
                pictureUrl ? (
                    <Image
                        src={pictureUrl}
                        size="23px"
                        borderRadius="25px"
                        my="1px"
                        mr="1px"
                    />
                ) : (
                    <Icon
                        as={AntDesign}
                        name="questioncircleo"
                        color="indigo.500"
                        size="20px"
                    />
                )
            }
        />
    )
}
