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
                        <VStack space={4} key={division.id}>
                            <HStack space={2}>
                                <Text fontSize="xl" bold color="secondary.3">
                                    {division?.name}
                                </Text>
                            </HStack>
                            {division?.positionList?.map(
                                (position) =>
                                    position && (
                                        <HStack
                                            justifyContent="space-between"
                                            key={position.id}
                                        >
                                            <HStack
                                                flex={1}
                                                space={4}
                                                alignItems="center"
                                            >
                                                <Icon
                                                    as={Ionicons}
                                                    name="person-outline"
                                                    color="secondary.2"
                                                />
                                                <Text
                                                    key={position.id}
                                                    fontSize="lg"
                                                    color="secondary.2"
                                                >
                                                    {position?.name}
                                                </Text>
                                            </HStack>
                                            <Icon
                                                as={Ionicons}
                                                name="md-ellipsis-vertical"
                                                size={5}
                                                color="secondary.2"
                                            />
                                        </HStack>
                                    )
                            )}
                        </VStack>
                    )
            )}
        </VStack>
    )
}
