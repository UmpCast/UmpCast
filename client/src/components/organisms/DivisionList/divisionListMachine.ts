import { createMachine, assign } from 'xstate'

type EditInfo = {
    typeName: 'position' | 'division'
    id: string
    name: string
}

interface StructContext {
    edit: EditInfo | null
}

type StructEvent =
    | { type: 'EDIT'; edit: EditInfo }
    | { type: 'FINISH' }
    | { type: 'DELETE' }
    | { type: 'CANCEL' }
    | { type: 'SUCCESS' }
    | { type: 'CONFIRM' }
    | { type: 'RENAME' }
    | { type: 'CREATE_POSITION' }
    | { type: 'CREATE_DIVISION' }

export const divisionListMachine = createMachine<StructContext, StructEvent>({
    id: 'struct',
    initial: 'idle',
    context: {
        edit: null
    },
    states: {
        idle: {
            on: {
                EDIT: {
                    target: 'editing.idle',
                    actions: assign({
                        edit: (_, event) => event.edit
                    })
                },
                CREATE_POSITION: {
                    target: 'creating.position'
                },
                CREATE_DIVISION: {
                    target: 'creating.division'
                }
            }
        },
        creating: {
            states: {
                position: {},
                division: {}
            }
        },
        editing: {
            id: 'editing',
            states: {
                idle: {
                    on: {
                        CANCEL: {
                            target: '#struct.idle'
                        },
                        DELETE: {
                            target: 'deleting'
                        },
                        RENAME: {
                            target: '#struct.idle'
                        }
                    }
                },
                deleting: {
                    on: {
                        CANCEL: {
                            target: 'idle'
                        },
                        CONFIRM: {
                            target: '#struct.idle'
                        }
                    }
                }
            }
        }
    }
})
