import { SeasonCalendarGameAssigneeAvatar_GameListingFragment } from '@/generated'
import { buildID, TestID } from '@/testing/testID'
import { Avatar, Text } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

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
                borderWidth={2}
                borderStyle="dotted"
                listing={listing}
            >
                <Text fontSize="sm" fontWeight="medium" color="blueGray.400">
                    {listing.name[0]}
                </Text>
            </AssigneeAvatar>
        )

    return (
        <AssigneeAvatar
            listing={listing}
            bg="indigo.600"
            source={{
                uri: assignee.profilePictureUrl
            }}
        />
    )
}
