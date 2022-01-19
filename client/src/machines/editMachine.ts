import { assign, createMachine, Interpreter } from 'xstate'

export type EditContext<TSelected> = {
    selected?: TSelected
}

export type EditEvent<TSelected> =
    | { type: 'START'; selected: TSelected }
    | { type: 'FINISH' }
    | { type: 'CANCEL' }
    | { type: 'CONFIRM_DELETE' }

export type EditTypestate<TSelected> =
    | {
          value: 'idle'
          context: EditContext<TSelected> & {
              selected: undefined
          }
      }
    | {
          value: 'editing' | 'editing.idle' | 'editing.confirmingDelete'
          context: EditContext<TSelected> & {
              selected: TSelected
          }
      }

export const createEditMachine = <TSelected>() =>
    createMachine<
        EditContext<TSelected>,
        EditEvent<TSelected>,
        EditTypestate<TSelected>
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
                    initial: 'idle',
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
                                }
                            }
                        }
                    }
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

export type EditService<TSelected> = Interpreter<
    EditContext<TSelected>,
    any,
    EditEvent<TSelected>,
    EditTypestate<TSelected>
>
