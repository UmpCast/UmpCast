import React from 'react'
import { render, within, fireEvent } from '@testing-library/react-native'
import startMirage from '@/server'
import ManagerSeasonList from '../containers/ManagerSeasonList'
import MockAppProvider from '@/app/common/components/MockAppProvider'

let server: ReturnType<typeof startMirage>

beforeEach(() => {
    server = startMirage({ environment: 'test' })
    server.create('userType')
})

afterEach(() => {
    server.shutdown()
})

it('displays all managed organizations with none selected', async () => {
    const permits = server.createList('managerPermit', 5)
    server.schema.first('userType')?.userPermit.update({
        managerPermitList: permits
    })

    const { getByText, findAllByRole, queryByTestId } = render(
        <ManagerSeasonList />,
        {
            wrapper: MockAppProvider
        }
    )

    const orgSelectables = await findAllByRole('button')
    expect(orgSelectables.length).toBe(5)

    expect(queryByTestId('selected-organization-selectable')).toBeNull()

    permits.forEach((permit) => getByText(permit.season.organization.name))
})

it('can change the selected organization', async () => {
    const permits = server.createList('managerPermit', 2)
    server.schema.first('userType')?.userPermit.update({
        managerPermitList: permits
    })

    const { findAllByRole, findByTestId } = render(<ManagerSeasonList />, {
        wrapper: MockAppProvider
    })

    const firstPermit = permits[0]
    const orgName = firstPermit.season.organization.name

    const orgSelectable = (await findAllByRole('button')).find(
        (selectable) => within(selectable).queryByText(orgName) !== null
    )

    if (orgSelectable) fireEvent.press(orgSelectable)

    const selectedSelectable = await findByTestId(
        'selected-organization-selectable'
    )
    const orgNameText = within(selectedSelectable).queryByText(orgName)

    expect(orgNameText).not.toBeNull()
})
