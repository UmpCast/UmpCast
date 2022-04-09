import { format } from 'date-fns'
import { HStack, IPressableProps, Pressable, Text, VStack } from 'native-base'

import { SeasonCalendarGameItem_GameFragment } from '@/generated'
import { buildID, TestID } from '@/testing/testID'
import SeasonCalendarGameAssigneeAvatar from './GameAssigneeAvatar'

export interface SeasonCalendarGameItemProps extends IPressableProps {
    game: SeasonCalendarGameItem_GameFragment
}

function formatGameTime(startTime: Date, endTime?: Date | null) {
    if (!endTime)
        return format(startTime, `h${startTime.getMinutes() ? ':mm' : ''} aa`)

    const sameAmPm = startTime.getHours() >= 12 === endTime.getHours() >= 12

    const startFormat = `h${startTime.getMinutes() ? ':mm' : ''}${
        sameAmPm ? '' : ' aa'
    }`
    const endFormat = `h${endTime.getMinutes() ? ':mm' : ''}${
        sameAmPm ? '' : ' aa'
    }`

    return `${format(startTime, startFormat)} - ${format(endTime, endFormat)}${
        sameAmPm ? ` ${format(startTime, 'aa')}` : ''
    }`
}

export default function SeasonCalendarGameItem({
    game,
    ...rest
}: SeasonCalendarGameItemProps) {
    const { name, startTime, endTime, location, listings, id } = game

    const gameDetails =
        formatGameTime(
            new Date(startTime),
            endTime ? new Date(endTime) : null
        ) + (location ? ` at ${location}` : '')

    return (
        <Pressable
            testID={buildID(TestID.COMPONENT, 'SeasonCalendarGameItem', id)}
            {...rest}
        >
            <VStack flex={1}>
                <HStack justifyContent="space-between">
                    <Text color="blueGray.600" fontWeight="medium" isTruncated>
                        {name}
                    </Text>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text color="blueGray.400">{gameDetails}</Text>
                    <HStack space={1}>
                        {listings.map((listing) => {
                            return (
                                <SeasonCalendarGameAssigneeAvatar
                                    listing={listing}
                                    key={listing.id}
                                />
                            )
                        })}
                    </HStack>
                </HStack>
            </VStack>
        </Pressable>
    )
}
