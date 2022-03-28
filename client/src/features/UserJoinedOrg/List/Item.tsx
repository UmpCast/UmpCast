import { AntDesign } from '@expo/vector-icons'
import { Icon, Image } from 'native-base'

import { UserJoinedOrgItem_OrganizationFragment } from '@/generated'

import { UserJoinedOrgListItemButton } from './ItemButton'

export interface UserJoinedOrgListItemProps {
    org: UserJoinedOrgItem_OrganizationFragment
    onPress: () => void
}

export default function UserJoinedOrgListItem({
    org,
    onPress
}: UserJoinedOrgListItemProps) {
    const { name, logoUrl } = org

    return (
        <UserJoinedOrgListItemButton
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
