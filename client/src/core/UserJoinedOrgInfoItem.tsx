import { AntDesign } from '@expo/vector-icons'
import { Icon, Image } from 'native-base'

import { UserJoinedOrgItem_OrganizationFragment } from '@/generated'

import { UserJoinedOrgInfoItemButton } from './UserJoinedOrgInfoItemButton'

export interface UserJoinedOrgItemProps {
    org: UserJoinedOrgItem_OrganizationFragment
    onPress: () => void
}

export default function UserJoinedOrgItem({
    org,
    onPress
}: UserJoinedOrgItemProps) {
    const { name, logoUrl } = org

    return (
        <UserJoinedOrgInfoItemButton
            name={name}
            onPress={onPress}
            source={
                logoUrl ? (
                    <Image
                        alt="organization-picture"
                        borderRadius="15px"
                        size="20px"
                        src={logoUrl}
                    />
                ) : (
                    <Icon
                        as={AntDesign}
                        color="indigo.500"
                        name="questioncircleo"
                        size="20px"
                    />
                )
            }
        />
    )
}
