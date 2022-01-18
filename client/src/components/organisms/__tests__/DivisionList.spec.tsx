import MockAppProvider from '@/components/MockAppProvider'
import DivisionList from '@/components/organisms/DivisionList'
import { createRender, CreateRenderAPI, waitForRender } from '@/tests/setup'
import { act, fireEvent, waitFor, within } from '@testing-library/react-native'
import { createMachine } from 'xstate'
import { createModel } from '@xstate/test'
import PositionCreateScreen from '@/components/screens/PositionCreateScreen'
import { RootStack, RootStackRoutes } from '@/navigation'
import { repeatedDebug } from '@/utils/dev/debug'

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

const editDivisionMachine = createMachine({
    id: 'editDivision',
    initial: 'render',
    states: {
        render: {
            on: {
                CLICK_DIVISION_EDIT: 'divisionAction',
                CLICK_POSITION_CREATE: 'positionCreate'
            },
            meta: {
                test: async ({ findByText, resolvers }: CreateRenderAPI) => {
                    await findByText(/division 1/i)
                    await findByText(/position 1/i)
                    await findByText(/division 2/i)

                    expect(
                        resolvers.Query.season.mock.calls[0][1]
                    ).toMatchObject({
                        id: '1'
                    })
                }
            }
        },
        positionCreate: {
            on: {
                FILL_POSITION_FORM: 'positionCreateComplete'
            }
        },
        positionCreateComplete: {
            type: 'final',
            meta: {
                test: async () => {}
            }
        },
        divisionAction: {
            on: {
                SELECT_DIVISION_DELETE: 'divisionDelete'
            },
            meta: {
                test: async ({ findByTestId }: CreateRenderAPI) => {
                    const actionSheet = await findByTestId(
                        /division-edit-actionsheet/i
                    )
                    await within(actionSheet).getByText(/division 1/i)
                }
            }
        },
        divisionDelete: {
            on: {
                CANCEL_DIVISION_DELETE: 'divisionAction',
                CONFIRM_DIVISION_DELETE: 'divisionDeleteComplete'
            },
            meta: {
                test: async ({ findByText }: CreateRenderAPI) => {
                    await findByText(/delete division/i)
                }
            }
        },
        divisionDeleteCancel: {
            type: 'final',
            meta: {
                test: async ({
                    getByTestId,
                    queryByTestId
                }: CreateRenderAPI) => {
                    await waitFor(() =>
                        expect(
                            queryByTestId(/division-delete-modal/i)
                        ).toBeNull()
                    )

                    getByTestId(/division-edit-actionsheet/i)
                }
            }
        },
        divisionDeleteComplete: {
            type: 'final',
            meta: {
                test: async ({
                    queryByText,
                    queryByTestId,
                    resolvers
                }: CreateRenderAPI) => {
                    await waitFor(() =>
                        expect(queryByText(/division 1/i)).toBeNull()
                    )

                    expect(
                        queryByTestId(/division-edit-actionsheet/i)
                    ).toBeNull()
                    expect(queryByTestId(/division-delete-modal/i)).toBeNull()
                    expect(
                        resolvers.Mutation.deleteDivision.mock.calls[0][1]
                    ).toMatchObject({
                        id: '1'
                    })
                }
            }
        }
    }
})

const model = createModel<CreateRenderAPI>(editDivisionMachine).withEvents({
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

const plan = model.getPlanFromEvents(
    [
        {
            type: 'CLICK_POSITION_CREATE'
        },
        {
            type: 'FILL_POSITION_FORM'
        }
    ],
    {
        target: 'positionCreateComplete'
    }
)

// testPlans.forEach((plan, i) => {
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
// })
