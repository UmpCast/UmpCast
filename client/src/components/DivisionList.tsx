import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, VStack, Text } from 'native-base'

import { useGetSeasonStructureQuery } from '@/generated'

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
                                <Icon
                                    as={Ionicons}
                                    color="primary.2"
                                    name="create-outline"
                                />
                                <Text bold color="secondary.3" fontSize="xl">
                                    {division?.name}
                                </Text>
                            </HStack>
                            {division?.positionList?.map(
                                (position) =>
                                    position && (
                                        <HStack
                                            key={position.id}
                                            justifyContent="space-between"
                                        >
                                            <HStack
                                                alignItems="center"
                                                space={4}
                                                pl={4}
                                            >
                                                <Icon
                                                    as={Ionicons}
                                                    color="secondary.2"
                                                    name="person-outline"
                                                />
                                                <Text
                                                    key={position.id}
                                                    color="secondary.2"
                                                    fontSize="lg"
                                                >
                                                    {position?.name}
                                                </Text>
                                            </HStack>
                                            <Icon
                                                as={Ionicons}
                                                color="secondary.2"
                                                name="md-ellipsis-vertical"
                                                size={5}
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
