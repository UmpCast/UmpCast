import React from 'react'
import MockAppProvider from '@/components/MockAppProvider'
import DivisionList from '@/components/organisms/DivisionList'
import { createRender, CreateRenderAPI, createTestMachine } from '@/tests/setup'
import { act, fireEvent, waitFor, within } from '@testing-library/react-native'
import { MachineConfig } from 'xstate'
import { createModel } from '@xstate/test'
import PositionCreateScreen from '@/components/screens/PositionCreateScreen'
import { RootStack, RootStackRoutes } from '@/navigation'

function setup() {
    const DivisionListTest = () => <DivisionList seasonId="1" />

    return createRender((client) => (
        <MockAppProvider client={client} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    name={RootStackRoutes.SeasonStructure}
                    component={DivisionListTest}
                />
                <RootStack.Screen
                    name={RootStackRoutes.PositionCreate}
                    component={PositionCreateScreen}
                />
            </RootStack.Navigator>
        </MockAppProvider>
    ))
}

type Events =
    | { type: 'CLICK_DIVISION_EDIT' }
    | { type: 'CLICK_POSITION_CREATE' }
    | { type: 'FILL_POSITION_FORM' }
    | { type: 'SELECT_DIVISION_DELETE' }
    | { type: 'CANCEL_DIVISION_DELETE' }
    | { type: 'CONFIRM_DIVISION_DELETE' }

export const editDivisionMachineConfig: MachineConfig<any, any, Events> = {
    id: 'editDivision',
    initial: 'render',
    states: {
        render: {
            on: {
                CLICK_DIVISION_EDIT: 'divisionAction',
                CLICK_POSITION_CREATE: 'positionCreate'
            }
        },
        positionCreate: {
            on: {
                FILL_POSITION_FORM: 'positionCreateComplete'
            }
        },
        divisionAction: {
            on: {
                SELECT_DIVISION_DELETE: 'divisionDelete'
            }
        },
        divisionDelete: {
            on: {
                CANCEL_DIVISION_DELETE: 'divisionDeleteCancel',
                CONFIRM_DIVISION_DELETE: {
                    target: 'divisionDeleteComplete'
                }
            }
        },
        positionCreateComplete: {
            type: 'final'
        },
        divisionDeleteCancel: {
            type: 'final'
        },
        divisionDeleteComplete: {
            type: 'final'
        }
    }
}

const testMachine = createTestMachine(editDivisionMachineConfig, {
    render: async ({ findByText, resolvers }) => {
        await findByText(/division 1/i)
        await findByText(/position 1/i)
        await findByText(/division 2/i)

        expect(resolvers.Query.season.mock.calls[0][1]).toMatchObject({
            id: '1'
        })
    },
    positionCreateComplete: async () => {},
    divisionAction: async ({ findByTestId }) => {
        const actionSheet = await findByTestId(/division-edit-actionsheet/i)
        await within(actionSheet).getByText(/division 1/i)
    },
    divisionDelete: async ({ findByText }) => {
        await findByText(/delete division/i)
    },
    divisionDeleteCancel: async ({ getByTestId, queryByTestId }) => {
        await waitFor(() =>
            expect(queryByTestId(/division-delete-modal/i)).toBeNull()
        )

        getByTestId(/division-edit-actionsheet/i)
    },
    divisionDeleteComplete: async ({
        queryByText,
        queryByTestId,
        resolvers
    }) => {
        await waitFor(() => expect(queryByText(/division 1/i)).toBeNull())

        expect(queryByTestId(/division-edit-actionsheet/i)).toBeNull()
        expect(queryByTestId(/division-delete-modal/i)).toBeNull()
        expect(
            resolvers.Mutation.deleteDivision.mock.calls[0][1]
        ).toMatchObject({
            id: '1'
        })
    }
})

const model = createModel<CreateRenderAPI>(testMachine).withEvents({
    CLICK_POSITION_CREATE: {
        exec: async ({ findByTestId }) => {
            const addIcon = await findByTestId('division-add-icon-1')

            fireEvent.press(addIcon)
        }
    },
    FILL_POSITION_FORM: {
        exec: async ({ findByTestId }) => {
            const withinForm = within(
                await findByTestId('position-create-form')
            )
            const nameInput = await withinForm.findByTestId(/name-input/i)
            fireEvent.changeText(nameInput, 'position 2')

            const createButton = await within(
                await withinForm.findByTestId('position-create-form')
            ).findByText(/^create$/i)

            fireEvent.press(createButton)
        }
    },
    CLICK_DIVISION_EDIT: {
        exec: async ({ findByTestId }) => {
            const editIcon = await findByTestId('division-edit-icon-1')

            fireEvent.press(editIcon)
        }
    },
    SELECT_DIVISION_DELETE: {
        exec: async ({ findByText, findByTestId }) => {
            const deleteActionItem = await findByText(/delete/i)

            fireEvent.press(deleteActionItem)

            await findByTestId(/division-delete-modal/i)
        }
    },
    CANCEL_DIVISION_DELETE: {
        exec: async ({ findByText }) => {
            const cancelButton = await findByText(/cancel/i)

            fireEvent.press(cancelButton)
        }
    },
    CONFIRM_DIVISION_DELETE: {
        exec: async ({ findByText }) => {
            const confirmButton = await findByText(/confirm/i)

            fireEvent.press(confirmButton)
        }
    }
})

// const plan = model.getPlanFromEvents(
//     [
//         {
//             type: 'CLICK_POSITION_CREATE'
//         },
//         {
//             type: 'FILL_POSITION_FORM'
//         }
//     ],
//     {
//         target: 'positionCreateComplete'
//     }
// )
console.log()
model.getSimplePathPlans().forEach((plan, i) => {
    describe(plan.description, () => {
        plan.paths.forEach((path, i) => {
            it(path.description, async () => {
                const utils = setup()
                const { resolvers } = utils

                resolvers.Query.season.mockReturnValue({
                    divisionList: [
                        {
                            id: '1',
                            name: 'division 1',
                            positionList: [
                                {
                                    id: '1',
                                    name: 'position 1'
                                }
                            ]
                        },
                        {
                            id: '2',
                            name: 'division 2',
                            positionList: []
                        }
                    ]
                })

                return act(() => path.test(utils))
            })
        })
    })
})
