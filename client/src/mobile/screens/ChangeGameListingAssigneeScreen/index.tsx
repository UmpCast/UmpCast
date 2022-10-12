import { Avatar, HStack, Text, VStack } from 'native-base'
import { useState } from 'react'

import Form from '@/components/Form'
import MaterialIcon from '@/components/MaterialIcon'
import AppPressable from '@/components/AppPressable'
import ScreenContainer from '@/components/ScreenContainer'
import { useAssignGameListingMutation } from '@/graphql/mutations/AssignGameListing/index.generated'
import { useFreeGameListingMutation } from '@/graphql/mutations/FreeGameListing/index.generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'
import UserItem, { NoUserItem } from '@/features/UserItem'
import SearchBar from '../../../components/SearchBar'

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
                <SearchBar onChangeText={setQuery} placeholder="Search" />
                <VStack>
                    {gameListingHasAssignee && (
                        <NoUserItem label="No Assignee" onPress={onNoAssigneePress} />
                    )}
                    {queriedAssignees.map((availAssignee) => (
                        <UserItem
                            user={availAssignee}
                            onPress={() => onAvailAssigneePress(availAssignee.id)}
                            key={availAssignee.id}
                        />
                    ))}
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
