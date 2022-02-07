import OrganizationLayoutItem from '@/core/Organization/Layout/Item'
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
        <OrganizationLayoutItem
            onPress={onPress}
            title={title || 'N/A'}
            source={
                profilePicture ? (
                    <Image
                        src={profilePicture}
                        size="20px"
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
