import { useRoute } from '@react-navigation/native'
import { Box, VStack } from 'native-base'

import SeasonEditStructDivisionActionSheet from '@/features/Season/core/EditStruct/DivisionActionSheet'
import SeasonEditStructDivisionHeader from '@/features/Season/core/EditStruct/DivisionHeader'
import PositionActionSheet from '@/features/Season/core/EditStruct/PositionActionsheet'
import SeasonEditStructPositionItem from '@/features/Season/core/EditStruct/PositionItem'
import useSeasonEditStructStore from '@/features/Season/core/EditStruct/useStore'
import { useSeasonStructureScreenQuery } from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type ScreenProps = RootStackScreenProps<RootStackRoute.SeasonStructure>

export default function SeasonStructureScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useSeasonStructureScreenQuery({
        variables: {
            seasonId
        }
    })

    const [editorStore, editorDispatch] = useSeasonEditStructStore()

    return (
        <Box p={4}>
            <VStack space={4}>
                {data?.season?.divisions.map(
                    (division) =>
                        division && (
                            <VStack key={division.id} space={4}>
                                <SeasonEditStructDivisionHeader
                                    division={division}
                                    onTitlePress={() => {
                                        editorDispatch({
                                            type: 'start',
                                            payload: {
                                                editing: 'division',
                                                division
                                            }
                                        })
                                    }}
                                />
                                {division.positions.map(
                                    (position) =>
                                        position && (
                                            <SeasonEditStructPositionItem
                                                key={position.id}
                                                onPress={() => {
                                                    editorDispatch({
                                                        type: 'start',
                                                        payload: {
                                                            editing: 'position',
                                                            position
                                                        }
                                                    })
                                                }}
                                                position={position}
                                            />
                                        )
                                )}
                            </VStack>
                        )
                )}
            </VStack>
            <SeasonEditStructDivisionActionSheet
                division={editorStore.division}
                isOpen={editorStore.editing === 'division'}
                onClose={() => editorDispatch({ type: 'stop' })}
            />
            <PositionActionSheet
                isOpen={editorStore.editing === 'position'}
                onClose={() => editorDispatch({ type: 'stop' })}
                position={editorStore.position}
            />
        </Box>
    )
}
