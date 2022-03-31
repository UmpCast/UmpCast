import { SeasonCalendarGameItem_GameFragment } from '@/generated'
import {
    Box,
    HStack,
    Avatar,
    IPressableProps,
    Pressable,
    Text,
    VStack
} from 'native-base'
import { format } from 'date-fns'
import { buildID, TestID } from '@/testing/testID'

export interface SeasonCalendarGameItemProps extends IPressableProps {
    game: SeasonCalendarGameItem_GameFragment
}

function formatGameTime(startTime: Date, endTime?: Date | null) {
    if (!endTime) return format(startTime, 'h:mm aa')

    const sameAmPm = startTime.getHours() >= 12 === endTime.getHours() >= 12

    const startFormat =
        'h' + (startTime.getMinutes() ? ':mm' : '') + (sameAmPm ? '' : ' aa')
    const endFormat =
        'h' + (endTime.getMinutes() ? ':mm' : '') + (sameAmPm ? '' : ' aa')

    return (
        `${format(startTime, startFormat)} - ${format(endTime, endFormat)}` +
        (sameAmPm ? ` ${format(startTime, 'aa')}` : '')
    )
}

export default function SeasonCalendarGameItem({
    game,
    ...rest
}: SeasonCalendarGameItemProps) {
    const { name, startTime, endTime, location, id } = game

    const gameDetails =
        formatGameTime(startTime, endTime) + (location ? ` at ${location}` : '')

    return (
        <Pressable
            testID={buildID(TestID.COMPONENT, 'SeasonCalendarGameItem', id)}
            {...rest}
        >
            <VStack flex={1}>
                <HStack justifyContent="space-between">
                    <Text fontWeight="medium" color="blueGray.600" isTruncated>
                        {name}
                    </Text>
                    {/* <Text fontWeight="medium" color="blueGray.400">
                        2/3
                    </Text> */}
                </HStack>
                <HStack justifyContent="space-between">
                    <Text color="blueGray.400">{gameDetails}</Text>
                    <Avatar.Group
                        size="xs"
                        max={3}
                        space={0}
                        alignSelf="flex-end"
                    >
                        <Avatar
                            bg="green.500"
                            source={{
                                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                            }}
                        >
                            AJ
                        </Avatar>
                        <Avatar bg="indigo.500">JB</Avatar>
                    </Avatar.Group>
                </HStack>
            </VStack>
        </Pressable>
    )
}
