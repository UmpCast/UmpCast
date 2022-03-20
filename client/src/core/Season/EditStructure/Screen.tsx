import { Box, VStack } from 'native-base'

import { useSeasonEditStructureScreenQuery } from '@/generated'
import DivisionActionSheet from '@/core/Division/Edit/DivisionEditActionsheet'
import DivisionHeader from '@/core/Division/Edit/DivisionEditHeader'
import PositionActionSheet from '@/core/Position/Edit/PositionEditActionsheet'
import PositionEditItem from '@/core/Position/Edit/PositionEditItem'
import useSeasonEditStructureStore from './useStore'
import { useRoute } from '@react-navigation/native'
import {
    AppRootStackRoute,
    AppRootStackScreenProps
} from '@/core/App/Root/Stack'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.SeasonStructure>

export default function SeasonEditStructureScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useSeasonEditStructureScreenQuery({
        variables: {
            seasonId
        }
    })

    const [editorStore, editorDispatch] = useSeasonEditStructureStore()

    return (
        <Box p={4}>
            <VStack space={4}>
                {data?.season?.divisions.map(
                    (division) =>
                        division && (
                            <VStack key={division.id} space={4}>
                                <DivisionHeader
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
                                            <PositionEditItem
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
            <DivisionActionSheet
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
