import { Reducer, useReducer } from 'react'

import {
    SeasonEditStructureScreen_DivisionFragment,
    SeasonEditStructureScreen_PositionFragment
} from '@/generated'

type CurrentEdit = 'position' | 'division'

type SeasonEditStructureScreenStore = {
    editing: CurrentEdit | null
    position: SeasonEditStructureScreen_PositionFragment | null
    division: SeasonEditStructureScreen_DivisionFragment | null
}

type SeasonEditStructureScreenAction =
    | { type: 'stop' }
    | {
          type: 'start'
          payload:
              | {
                    editing: 'position'
                    position: SeasonEditStructureScreen_PositionFragment
                }
              | {
                    editing: 'division'
                    division: SeasonEditStructureScreen_DivisionFragment
                }
      }

export default function useSeasonEditStructureStore() {
    return useReducer<
        Reducer<SeasonEditStructureScreenStore, SeasonEditStructureScreenAction>
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
