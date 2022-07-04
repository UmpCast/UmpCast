import { Reducer, useReducer } from 'react'

import {
    SeasonStructureScreen_DivisionFragment,
    SeasonStructureScreen_PositionFragment
} from '@/graphql/generated'

type CurrentEdit = 'position' | 'division'

type SeasonStructureScreenStore = {
    editing: CurrentEdit | null
    position: SeasonStructureScreen_PositionFragment | null
    division: SeasonStructureScreen_DivisionFragment | null
}

type SeasonStructureScreenAction =
    | { type: 'stop' }
    | {
          type: 'start'
          payload:
              | {
                    editing: 'position'
                    position: SeasonStructureScreen_PositionFragment
                }
              | {
                    editing: 'division'
                    division: SeasonStructureScreen_DivisionFragment
                }
      }

export default function useSeasonEditStructStore() {
    return useReducer<
        Reducer<SeasonStructureScreenStore, SeasonStructureScreenAction>
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
