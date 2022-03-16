import { VStack } from 'native-base'

import { useSeasonStructureEditorQuery } from '@/generated'
import DivisionActionSheet from '@/core/Division/Edit/DivisionEditActionsheet'
import DivisionHeader from '@/core/Division/Edit/DivisionEditHeader'
import PositionActionSheet from '@/core/Position/Edit/PositionEditActionsheet'
import PositionEditItem from '@/core/Position/Edit/PositionEditItem'
import useSeasonStructureEditor from './useSeasonStructureEditor'

export default function SeasonStructureEditor({
    seasonId
}: {
    seasonId: string
}) {
    const [{ data }] = useSeasonStructureEditorQuery({
        variables: {
            id: seasonId
        }
    })

    const [editorStore, editorDispatch] = useSeasonStructureEditor()

    return (
        <>
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
        </>
    )
}
