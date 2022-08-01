import ListItem from '@/components/List/Item'
import ScreenContainer from '@/components/Screen/Container'
import UserTag from '@/features/User/Tag'
import {
    GameListingAssignee_UserFragment as User,
    GameListingAssignee_GameListingFragment as GameListing,
    useGameListingAssigneeScreenQuery,
    useUnassignGameListingMutation
} from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { Feather } from '@expo/vector-icons'
import { Icon, Input, VStack } from 'native-base'
import { useState } from 'react'
import { useAssignGameListingMutation } from '../../../graphql/generated'

type GameListingAssigneeScreenProps =
    RootStackScreenProps<RootStackRoute.GameListingAssignee>

export default function GameListingAssigneeScreen({
    navigation,
    route
}: GameListingAssigneeScreenProps) {
    const { pop } = navigation
    const { params } = route

    const [name, setName] = useState('')

    const [screenResp] = useGameListingAssigneeScreenQuery({
        variables: {
            gameListingId: params.gameListingId,
            name
        }
    })

    const [_unassignResp, unassignExec] = useUnassignGameListingMutation()
    const [_assignResp, assignExec] = useAssignGameListingMutation()

    const { gameListing } = screenResp.data ?? {}
    if (!gameListing) return null

    let availAssignees: User[] = [
        {
            id: '-1',
            firstName: 'No assignee',
            lastName: '',
            profilePictureUrl: null
        },
        ...(gameListing?.availableAssignees || [])
    ]

    const onSearchChange = (name: string) => {
        setName(name)
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
                    placeholder="Member name"
                    width="100%"
                    borderRadius="4"
                    backgroundColor="blueGray.200"
                    size="lg"
                    value={name}
                    onChangeText={onSearchChange}
                    InputRightElement={
                        <Icon
                            size="md"
                            color="gray.400"
                            mr={2}
                            as={<Feather name="search" />}
                        />
                    }
                />
                <VStack space={1}>
                    {availAssignees.map((availAssignee) => {
                        return (
                            <ListItem
                                onPress={() =>
                                    onAvailAssigneePress(
                                        gameListing,
                                        availAssignee
                                    )
                                }
                                p={2}
                                key={availAssignee.id}
                            >
                                <UserTag user={availAssignee} />
                            </ListItem>
                        )
                    })}
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
