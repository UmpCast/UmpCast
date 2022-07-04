import { Avatar, Text } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

import { SeasonCalendarGameAssigneeAvatar_GameListingFragment } from '@/graphql/generated'
import { buildID, TestID } from '@/testing/testID'

export interface SeasonCalendarGameAssigneeAvatarProps {
    listing: SeasonCalendarGameAssigneeAvatar_GameListingFragment
}

interface AssigneeAvatarProps extends IAvatarProps {
    listing: SeasonCalendarGameAssigneeAvatar_GameListingFragment
}

function AssigneeAvatar({ listing, ...rest }: AssigneeAvatarProps) {
    return (
        <Avatar
            size="xs"
            testID={buildID(
                TestID.COMPONENT,
                'SeasonCalendarGameAssigneeAvatar',
                listing.id
            )}
            {...rest}
        />
    )
}

export default function SeasonCalendarGameAssigneeAvatar({
    listing
}: SeasonCalendarGameAssigneeAvatarProps) {
    const assignee = listing.assignee?.node

    if (!assignee?.profilePictureUrl)
        return (
            <AssigneeAvatar
                bg="white"
                borderColor="blueGray.400"
                borderStyle="dotted"
                borderWidth={2}
                listing={listing}
            >
                <Text color="blueGray.400" fontSize="sm" fontWeight="medium">
                    {listing.name[0]}
                </Text>
            </AssigneeAvatar>
        )

    return (
        <AssigneeAvatar
            bg="indigo.600"
            listing={listing}
            source={{
                uri: assignee.profilePictureUrl
            }}
        />
    )
}
