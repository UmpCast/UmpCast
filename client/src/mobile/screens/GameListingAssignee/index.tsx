import { Feather } from '@expo/vector-icons'
import { Icon, Input, VStack } from 'native-base'
import { useState } from 'react'

import ListItem from '@/components/List/Item'
import ScreenContainer from '@/components/Screen/Container'
import UserTag from '@/features/User/Tag'
import {
    GameListingAssignee_UserFragment as User,
    GameListingAssignee_GameListingFragment as GameListing,
    useGameListingAssigneeScreenQuery,
    useUnassignGameListingMutation,
    useAssignGameListingMutation
} from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type GameListingAssigneeScreenProps =
    RootStackScreenProps<RootStackRoute.GameListingAssignee>

export default function GameListingAssigneeScreen({
    navigation,
    route
}: GameListingAssigneeScreenProps) {
    const { pop } = navigation
    const { params } = route

    const [searchQuery, setSearchQuery] = useState('')

    const [screenResp] = useGameListingAssigneeScreenQuery({
        variables: {
            gameListingId: params.gameListingId,
            name: searchQuery
        }
    })

    const [, unassignExec] = useUnassignGameListingMutation()
    const [, assignExec] = useAssignGameListingMutation()

    const { gameListing } = screenResp.data ?? {}
    if (!gameListing) return null

    const availAssignees: User[] = [
        {
            id: '-1',
            firstName: 'No assignee',
            lastName: '',
            profilePictureUrl: null
        },
        ...(gameListing?.availableAssignees || [])
    ]

    const onSearchChange = (newSearchQuery: string) => {
        setSearchQuery(newSearchQuery)
    }

    const onAvailAssigneePress = async (
        gameListing: GameListing,
        assignee: User
    ) => {
        const gameListingId = gameListing.id

        if (assignee.id === '-1') {
            await unassignExec({
                input: {
                    gameListingId
                }
            })
        } else {
            await assignExec({
                input: {
                    gameListingId,
                    userId: assignee.id
                }
            })
        }

        pop()
    }

    return (
        <ScreenContainer>
            <VStack space={4}>
                <Input
                    backgroundColor="blueGray.200"
                    borderRadius="4"
                    InputRightElement={
                        <Icon
                            as={<Feather name="search" />}
                            color="gray.400"
                            mr={2}
                            button="md"
                        />
                    }
                    onChangeText={onSearchChange}
                    placeholder="Member name"
                    button="lg"
                    value={searchQuery}
                    width="100%"
                />
                <VStack space={1}>
                    {availAssignees.map((availAssignee) => (
                        <ListItem
                            key={availAssignee.id}
                            onPress={() =>
                                onAvailAssigneePress(gameListing, availAssignee)
                            }
                            p={2}
                        >
                            <UserTag user={availAssignee} />
                        </ListItem>
                    ))}
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
