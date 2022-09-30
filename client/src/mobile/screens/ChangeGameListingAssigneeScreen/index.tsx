import { Avatar, HStack, Text, VStack } from 'native-base'
import { useState } from 'react'

import Form from '@/components/Form'
import MaterialIcon from '@/components/MaterialIcon'
import PressableX from '@/components/PressableX'
import ScreenContainer from '@/components/ScreenContainer'
import UserAvatar from '@/features/UserAvatar'
import { useAssignGameListingMutation } from '@/graphql/mutations/AssignGameListing/index.generated'
import { useFreeGameListingMutation } from '@/graphql/mutations/FreeGameListing/index.generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'

type Props = RootStackScreenProps<RootStackRoute.ChangeGameListingAssignee>

export default function ChangeGameListingAssigneeScreen({ navigation, route }: Props) {
    const { params } = route
    const { gameListingId } = params

    const { pop } = navigation

    const [, freeGameListing] = useFreeGameListingMutation()
    const [, assignGameListing] = useAssignGameListingMutation()

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            gameListingId
        }
    })

    const [query, setQuery] = useState('')

    if (!screenData) {
        return null
    }

    const { gameListing } = screenData
    const { availableAssignees, assignee } = gameListing

    const gameListingHasAssignee = assignee !== null

    const queriedAssignees = availableAssignees.filter((assignee) => {
        const fullname = `${assignee.firstName} ${assignee.lastName}`

        return fullname.includes(query)
    })

    const onNoAssigneePress = async () => {
        await freeGameListing({
            input: {
                gameListingId
            }
        })
        pop()
    }

    const onAvailAssigneePress = async (userId: string) => {
        await assignGameListing({
            input: {
                userId,
                gameListingId
            }
        })
        pop()
    }

    return (
        <ScreenContainer px={2} title="Change Assignee">
            <VStack space="sm">
                <Form.UncontrolledInput
                    InputLeftElement={
                        <MaterialIcon color="secondary.mute" ml={4} name="magnify" size="lg" />
                    }
                    mx={2}
                    onChangeText={(s) => {
                        setQuery(s)
                    }}
                    placeholder="Search"
                />
                <VStack>
                    {gameListingHasAssignee && (
                        <PressableX
                            onPress={onNoAssigneePress}
                            rounded="sm"
                            size="sm"
                            variant="secondary.ghost"
                        >
                            <HStack alignItems="center" space="md">
                                <Avatar size="sm">
                                    <MaterialIcon name="account" />
                                </Avatar>
                                <Text bold fontSize="sm">
                                    No assignee
                                </Text>
                            </HStack>
                        </PressableX>
                    )}
                    {queriedAssignees.map((availAssignee) => (
                        <PressableX
                            key={availAssignee.id}
                            onPress={() => onAvailAssigneePress(availAssignee.id)}
                            rounded="sm"
                            size="sm"
                            variant="secondary.ghost"
                        >
                            <HStack alignItems="center" space="md">
                                <UserAvatar size="sm" user={availAssignee} />
                                <Text bold fontSize="sm">
                                    {availAssignee.firstName} {availAssignee.lastName}
                                </Text>
                            </HStack>
                        </PressableX>
                    ))}
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
