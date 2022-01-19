import {
    assign,
    createMachine,
    spawn,
    ActorRef,
    Interpreter,
    State
} from 'xstate'
import { EditEvent, editMachine } from './editMachine'

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
    edit?: ActorRef<EditEvent>
    selected?: EditStructSelection
}

export type EditStructEvent =
    | { type: 'START'; selected: EditStructSelection }
    | { type: 'FINISH' }

export type EditStructTypestate =
    | {
          value: 'idle'
          context: EditStructContext & {
              selected: undefined
          }
      }
    | {
          value: 'editing'
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
        context: {},
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
                    FINISH: 'idle'
                },
                exit: 'resetEdit'
            }
        }
    },
    {
        actions: {
            setEdit: assign((_, event) => {
                if (event.type !== 'START') return {}
                return {
                    edit: spawn(editMachine, { sync: true }),
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
export type EditStructState = State<
    EditStructContext,
    EditStructEvent,
    EditStructTypestate
>
