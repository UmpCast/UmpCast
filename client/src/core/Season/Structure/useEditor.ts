import { Reducer, useReducer } from 'react'

import {
    SeasonStructureEditor_DivisionFragment,
    SeasonStructureEditor_PositionFragment
} from '@/generated'

type CurrentEdit = 'position' | 'division'

type SeasonStructureEditorStore = {
    editing: CurrentEdit | null
    position: SeasonStructureEditor_PositionFragment | null
    division: SeasonStructureEditor_DivisionFragment | null
}

type SeasonStructureEditorAction =
    | { type: 'stop' }
    | {
          type: 'start'
          payload:
              | {
                    editing: 'position'
                    position: SeasonStructureEditor_PositionFragment
                }
              | {
                    editing: 'division'
                    division: SeasonStructureEditor_DivisionFragment
                }
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
