import UserJoinedOrgItem from '@/core/User/JoinedOrg/Item'
import { OrganizationInfoItemFragment } from '@/generated'
import { AntDesign } from '@expo/vector-icons'
import { Icon, Image } from 'native-base'

export interface OrganizationPreviewItemProps {
    org: OrganizationInfoItemFragment
    onPress: () => void
}

export default function OrganizationPreviewItem({
    org,
    onPress
}: OrganizationPreviewItemProps) {
    const { title, profilePicture } = org

    return (
        <UserJoinedOrgItem
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
