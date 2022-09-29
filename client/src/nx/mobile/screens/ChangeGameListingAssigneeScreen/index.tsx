import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { useScreenQuery } from './index.generated'
import ScreenContainer from '@/nx/components/ScreenContainer'
import { useState } from 'react'
import UserAvatar from '@/features/User/Avatar'
import { Avatar, HStack, Text, VStack } from 'native-base'
import MaterialIcon from '@/nx/components/MaterialIcon'
import PressableX from '@/nx/components/PressableX'
import Form from '@/nx/components/Form'
import { useFreeGameListingMutation } from '../../../graphql/mutations/FreeGameListing/index.generated'
import { useAssignGameListingMutation } from '../../../../graphql/generated'

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
        const fullname = assignee.firstName + ' ' + assignee.lastName

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
        <ScreenContainer title="Change Assignee" px={2}>
            <VStack space="sm">
                <Form.UncontrolledInput
                    mx={2}
                    onChangeText={(s) => {
                        setQuery(s)
                    }}
                    placeholder="Search"
                    InputLeftElement={
                        <MaterialIcon ml={4} name="magnify" size="lg" color="secondary.mute" />
                    }
                />
                <VStack>
                    {gameListingHasAssignee && (
                        <PressableX
                            size="sm"
                            variant="secondary.ghost"
                            rounded="sm"
                            onPress={onNoAssigneePress}
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
                    {queriedAssignees.map((availAssignee) => {
                        return (
                            <PressableX
                                size="sm"
                                key={availAssignee.id}
                                variant="secondary.ghost"
                                rounded="sm"
                                onPress={() => onAvailAssigneePress(availAssignee.id)}
                            >
                                <HStack alignItems="center" space="md">
                                    <UserAvatar size="sm" user={availAssignee} />
                                    <Text bold fontSize="sm">
                                        {availAssignee.firstName} {availAssignee.lastName}
                                    </Text>
                                </HStack>
                            </PressableX>
                        )
                    })}
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
