import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, VStack, Text } from 'native-base'

import { useGetSeasonStructureQuery } from '@/generated'
import DivisionEditAction from './DivisionEditAction'
import PositionItem from './PositionItem'

export interface DivisionListProps {
    seasonId: string
}

export default function DivisionList({ seasonId }: DivisionListProps) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    return (
        <VStack space={4}>
            {data?.season?.divisionList?.map(
                (division) =>
                    division && (
                        <VStack key={division.id} space={4}>
                            <HStack space={2} alignItems="center">
                                <DivisionEditAction
                                    divisionName={division.name ?? ''}
                                    onDelete={() => console.log('deleted')}
                                >
                                    <Icon
                                        as={Ionicons}
                                        color="primary.2"
                                        name="create-outline"
                                    />
                                </DivisionEditAction>
                                <Text bold color="secondary.3" fontSize="xl">
                                    {division?.name}
                                </Text>
                            </HStack>
                            {division?.positionList?.map(
                                (position) =>
                                    position && (
                                        <PositionItem
                                            key={position.id}
                                            positionName={position.name}
                                        />
                                    )
                            )}
                        </VStack>
                    )
            )}
        </VStack>
    )
}
