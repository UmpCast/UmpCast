import { DivisionEditSelection } from '@/core/Division/models'
import { PositionEditSelection } from '@/core/Position/models'
import { Reducer, useReducer } from 'react'

type CurrentEdit = 'position' | 'division'

type SeasonStructureEditorStore = {
    editing: CurrentEdit | null
    position: PositionEditSelection | null
    division: DivisionEditSelection | null
}

type SeasonStructureEditorAction =
    | { type: 'stop' }
    | {
          type: 'start'
          payload:
              | { editing: 'position'; position: PositionEditSelection }
              | { editing: 'division'; division: DivisionEditSelection }
      }

export default function useSeasonStructureEditor() {
    return useReducer<
        Reducer<SeasonStructureEditorStore, SeasonStructureEditorAction>
    >(
        (state, action) => {
            switch (action.type) {
                case 'stop':
                    return {
                        ...state,
                        editing: null
                    }
                case 'start':
                    return {
                        ...state,
                        ...action.payload
                    }
                default:
                    return state
            }
        },
        {
            editing: null,
            position: null,
            division: null
        }
    )
}
