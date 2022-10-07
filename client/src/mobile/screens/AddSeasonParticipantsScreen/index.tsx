import ScreenContainer from '@/components/ScreenContainer'
import UserItem from '@/features/UserItem'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { HStack, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import SearchBar from '../../../components/SearchBar'
import { useScreenQuery } from './index.generated'
import CheckBoxX from '@/components/CheckBoxX'
import ActionButton from '@/components/ActionButton'
import { useAddSeasonParticipantsMutation } from '../../../graphql/mutations/AddSeasonParticipants/index.generated'

type Props = RootStackScreenProps<RootStackRoute.AddSeasonParticipants>

export default function AddSeasonParticipantsScreen({ navigation, route }: Props) {
    const { pop } = navigation
    const { params } = route
    const { seasonId } = params

    const [query, setQuery] = useState('')
    const [memberIdsToAdd, setMemberIdsToAdd] = useState<string[]>([])

    const [, addSeasonParticipants] = useAddSeasonParticipantsMutation()

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            seasonId
        }
    })
    console.log(query)

    const resetState = () => {
        setQuery('')
        setMemberIdsToAdd([])
    }

    useEffect(() => {
        resetState()
    }, [screenData])

    if (!screenData) {
        return null
    }

    const { season } = screenData
    const { addableMembers } = season

    const queriedMembers = addableMembers.filter((member) => {
        const { user } = member

        const fullName = user.firstName + ' ' + user.lastName

        return fullName.includes(query)
    })

    const onAddParticipantPress = (userId: string) => {
        if (memberIdsToAdd.includes(userId)) {
            setMemberIdsToAdd(memberIdsToAdd.filter((memberId) => memberId !== userId))
        } else {
            setMemberIdsToAdd([...memberIdsToAdd, userId])
        }
    }

    const onSaveAddParticipantsPress = async () => {
        await addSeasonParticipants({
            input: {
                seasonId,
                userIds: memberIdsToAdd
            }
        })
        resetState()
        pop()
    }

    const showAddParticipantsButton = memberIdsToAdd.length > 0

    return (
        <ScreenContainer
            px={2}
            title="Add Participants"
            headerRight={
                <ActionButton
                    disabled={!showAddParticipantsButton}
                    onPress={onSaveAddParticipantsPress}
                >
                    Add
                </ActionButton>
            }
        >
            <VStack space="sm">
                <SearchBar onChangeText={setQuery} value={query} placeholder="Search" mx={2} />
                <VStack>
                    {queriedMembers.map((member) => {
                        const { user } = member
                        return (
                            <UserItem
                                user={user}
                                onPress={() => onAddParticipantPress(user.id)}
                                key={user.id}
                            >
                                <HStack alignItems="center">
                                    <CheckBoxX isChecked={memberIdsToAdd.includes(user.id)} />
                                </HStack>
                            </UserItem>
                        )
                    })}
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
