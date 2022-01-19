import { createEditMachine, EditService } from './editMachine'

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

export default createEditMachine<EditStructSelection>()

export type EditStructService = EditService<EditStructSelection>
