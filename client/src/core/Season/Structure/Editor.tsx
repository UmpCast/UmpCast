import { VStack } from 'native-base'

import { useGetSeasonStructureQuery } from '@/generated'

import PositionActionSheet from '@/core/Position/Edit/Actionsheet'
import PositionEditItem from '@/core/Position/Edit/Item'
import DivisionActionSheet from '@/core/Division/Edit/Actionsheet'
import DivisionHeader from '@/core/Division/Edit/Header'
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

    const renderPositionItems = (positions: SeasonStructurePosition[]) => {
        return positions.map(
            (position) =>
                position && (
                    <PositionEditItem
                        key={position.id}
                        position={position}
                        onPress={() => {
                            editorDispatch({
                                type: 'start',
                                payload: { editing: 'position', position }
                            })
                        }}
                    />
                )
        )
    }

    const renderDivisionItems = (divisions: SeasonStructureDivision[]) => {
        return divisions.map(
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
    }

    return (
        <>
            <VStack space={4}>
                {renderDivisionItems(data?.season?.divisionList ?? [])}
            </VStack>
            <DivisionActionSheet
                onClose={() => editorDispatch({ type: 'stop' })}
                isOpen={editorStore.editing === 'division'}
                division={editorStore.division}
            />
            <PositionActionSheet
                onClose={() => editorDispatch({ type: 'stop' })}
                isOpen={editorStore.editing === 'position'}
                position={editorStore.position}
            />
        </>
    )
}
