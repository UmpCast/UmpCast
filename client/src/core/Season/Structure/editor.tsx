import { VStack } from 'native-base'

import DivisionActionSheet from '@/core/Division/Edit/Actionsheet'
import DivisionHeader from '@/core/Division/Edit/Header'
import PositionActionSheet from '@/core/Position/Edit/Actionsheet'
import PositionEditItem from '@/core/Position/Edit/Item'
import { useGetSeasonStructureQuery } from '@/generated'

import useSeasonStructureEditor from './useEditor'

type SeasonStructurePosition =
    | {
          id: string
          name?: string | null
      }
    | null
    | undefined

type SeasonStructureDivision =
    | {
          id: string
          name?: string | null
          positionList?: SeasonStructurePosition[] | null
      }
    | null
    | undefined

export default function SeasonStructureEditor({
    seasonId
}: {
    seasonId: string
}) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    const [editorStore, editorDispatch] = useSeasonStructureEditor()

    const renderPositionItems = (positions: SeasonStructurePosition[]) =>
        positions.map(
            (position) =>
                position && (
                    <PositionEditItem
                        key={position.id}
                        onPress={() => {
                            editorDispatch({
                                type: 'start',
                                payload: { editing: 'position', position }
                            })
                        }}
                        position={position}
                    />
                )
        )

    const renderDivisionItems = (divisions: SeasonStructureDivision[]) =>
        divisions.map(
            (division) =>
                division && (
                    <VStack key={division.id} space={4}>
                        <DivisionHeader
                            division={division}
                            onTitlePress={() => {
                                editorDispatch({
                                    type: 'start',
                                    payload: { editing: 'division', division }
                                })
                            }}
                        />
                        {renderPositionItems(division?.positionList ?? [])}
                    </VStack>
                )
        )

    return (
        <>
            <VStack space={4}>
                {renderDivisionItems(data?.season?.divisionList ?? [])}
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
