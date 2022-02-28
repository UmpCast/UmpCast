import { VStack } from 'native-base'

import DivisionActionSheet from '@/core/Division/Edit/Actionsheet'
import DivisionHeader from '@/core/Division/Edit/Header'
import PositionActionSheet from '@/core/Position/Edit/Actionsheet'
import PositionEditItem from '@/core/Position/Edit/Item'
import { useSeasonStructureEditorQuery } from '@/generated'

import useSeasonStructureEditor from './useEditor'

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
                {data?.season?.divisionList?.map(
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
                                {division.positionList?.map(
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
