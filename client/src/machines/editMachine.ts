export type EditEvent = { type: 'CANCEL' } | { type: 'CONFIRM_DELETE' }

export const editMachineConfig = {
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
