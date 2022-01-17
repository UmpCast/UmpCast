import { useGetSeasonStructureQuery } from '@/generated'
import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, VStack } from 'native-base'
import { Text } from 'native-base'

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
                        <VStack space={4}>
                            <Text fontSize="xl" bold color="blueGray.800">
                                {division?.name}
                            </Text>
                            <VStack key={division.id} space={4} ml={4}>
                                {division?.positionList?.map(
                                    (position) =>
                                        position && (
                                            <HStack justifyContent="space-between">
                                                <HStack
                                                    space={5}
                                                    flex={1}
                                                    alignItems="center"
                                                >
                                                    <Icon
                                                        as={Ionicons}
                                                        name="person-outline"
                                                        size={5}
                                                        color="blueGray.500"
                                                    />
                                                    <Text
                                                        key={position.id}
                                                        fontSize="lg"
                                                        color="blueGray.500"
                                                    >
                                                        {position?.name}
                                                    </Text>
                                                </HStack>
                                                <Icon
                                                    as={Ionicons}
                                                    name="md-ellipsis-vertical"
                                                    size={5}
                                                    color="blueGray.500"
                                                />
                                            </HStack>
                                        )
                                )}
                            </VStack>
                        </VStack>
                    )
            )}
        </VStack>
    )
}
