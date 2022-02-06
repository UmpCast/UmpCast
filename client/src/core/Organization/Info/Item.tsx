import { PressableIconItem } from '@/components/Pressable/IconItem'
import { OrganizationInfoItemFragment } from '@/generated'
import { AntDesign } from '@expo/vector-icons'
import { Icon, Image } from 'native-base'

export interface OrganizationListItemProps {
    org: OrganizationInfoItemFragment
    onPress: () => void
}

export default function OrganizationListItem({
    org,
    onPress
}: OrganizationListItemProps) {
    const { title, profilePicture } = org

    return (
        <PressableIconItem
            onPress={onPress}
            title={title || 'N/A'}
            content={
                profilePicture ? (
                    <Image
                        src={profilePicture}
                        size="15px"
                        borderRadius="15px"
                        alt={'organization-picture'}
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
