import { createMachine, sendParent } from 'xstate'

export type EditEvent =
    | { type: 'SUCCESS' }
    | { type: 'CANCEL' }
    | { type: 'CONFIRM_DELETE' }
    | { type: 'CONFIRM' }

export type EditTypestate = {
    value: 'idle' | 'confirmingDelete' | 'done'
    context: undefined
}

export const editMachine = createMachine<undefined, EditEvent, EditTypestate>({
    id: 'edit',
    initial: 'idle',
    on: {
        CANCEL: {
            target: 'done'
        },
        SUCCESS: {
            target: 'done'
        }
    },
    states: {
        idle: {
            on: {
                CONFIRM_DELETE: {
                    target: 'confirmingDelete'
                }
            }
        },
        confirmingDelete: {
            on: {
                CANCEL: {
                    target: 'idle'
                },
                CONFIRM: {
                    target: 'done'
                }
            }
        },
        done: {
            entry: sendParent('FINISH'),
            type: 'final'
        }
    }
})
