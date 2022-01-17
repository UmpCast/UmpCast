import { useGetSeasonStructureQuery } from '@/generated'
import { VStack } from 'native-base'
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
        <VStack>
            {data?.season?.divisionList?.map(
                (division) =>
                    division && (
                        <VStack key={division.id}>
                            <Text>{division?.name}</Text>
                            {division?.positionList?.map(
                                (position) =>
                                    position && (
                                        <Text key={position.id}>
                                            {position?.name}
                                        </Text>
                                    )
                            )}
                        </VStack>
                    )
            )}
        </VStack>
    )
}
