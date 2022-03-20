import { Box, VStack } from 'native-base'

import { useSeasonEditStructScreenQuery } from '@/generated'
import useSeasonEditStructStore from './useStore'
import { useRoute } from '@react-navigation/native'
import {
    AppRootStackRoute,
    AppRootStackScreenProps
} from '@/core/App/Root/Stack'
import SeasonEditStructDivisionActionSheet from './DivisionActionSheet'
import SeasonEditStructDivisionHeader from './DivisionHeader'
import PositionActionSheet from './PositionActionsheet'
import SeasonEditStructPositionItem from './PositionItem'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.SeasonStructure>

export default function SeasonEditStructScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useSeasonEditStructScreenQuery({
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
