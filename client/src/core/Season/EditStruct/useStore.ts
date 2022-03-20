import { Reducer, useReducer } from 'react'

import {
    SeasonEditStructScreen_DivisionFragment,
    SeasonEditStructScreen_PositionFragment
} from '@/generated'

type CurrentEdit = 'position' | 'division'

type SeasonEditStructScreenStore = {
    editing: CurrentEdit | null
    position: SeasonEditStructScreen_PositionFragment | null
    division: SeasonEditStructScreen_DivisionFragment | null
}

type SeasonEditStructScreenAction =
    | { type: 'stop' }
    | {
          type: 'start'
          payload:
              | {
                    editing: 'position'
                    position: SeasonEditStructScreen_PositionFragment
                }
              | {
                    editing: 'division'
                    division: SeasonEditStructScreen_DivisionFragment
                }
      }

export default function useSeasonEditStructStore() {
    return useReducer<
        Reducer<SeasonEditStructScreenStore, SeasonEditStructScreenAction>
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
