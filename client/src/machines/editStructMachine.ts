import { assign, createMachine, Interpreter } from 'xstate'
import { EditEvent, editMachineConfig } from './editMachine'

type EditStructSelection =
    | {
          id: string
      } & (
          | {
                type: 'position'
                name: string
            }
          | {
                type: 'division'
                name: string
            }
      )

export type EditStructContext = {
    selected?: EditStructSelection
}

export type EditStructEvent =
    | { type: 'START'; selected: EditStructSelection }
    | { type: 'FINISH' }
    | EditEvent

export type EditStructTypestate =
    | {
          value: 'idle'
          context: EditStructContext & {
              selected: undefined
          }
      }
    | {
          value: 'editing' | 'editing.idle' | 'editing.confirmingDelete'
          context: EditStructContext & {
              selected: EditStructSelection
          }
      }

export default createMachine<
    EditStructContext,
    EditStructEvent,
    EditStructTypestate
>(
    {
        initial: 'idle',
        states: {
            idle: {
                on: {
                    START: {
                        target: 'editing',
                        actions: 'setEdit'
                    }
                }
            },
            editing: {
                on: {
                    FINISH: {
                        target: 'idle'
                    }
                },
                ...editMachineConfig
            }
        }
    },
    {
        actions: {
            setEdit: assign((_, event) => {
                if (event.type !== 'START') return {}
                return {
                    selected: event.selected
                }
            }),
            resetEdit: assign((_) => ({}))
        }
    }
)

export type EditStructService = Interpreter<
    EditStructContext,
    any,
    EditStructEvent,
    EditStructTypestate
>
