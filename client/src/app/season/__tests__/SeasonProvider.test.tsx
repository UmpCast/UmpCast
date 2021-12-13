import React from 'react'

import { render, within } from '@testing-library/react-native'
import { Text } from 'native-base'

import ManagerSeasonList from '../containers/ManagerSeasonList'
import SeasonProvider from '../containers/SeasonProvider'
import startMirage from '@/server'
import { AppServerType } from '@/server/createAppServer'
import MockAppProvider from '@/app/common/components/MockAppProvider'

let server: AppServerType

beforeEach(() => {
    server = startMirage({ environment: 'test' })
    server.create('userType')
})

afterEach(() => {
    server.shutdown()
})

it('selects the first organization when organizations are present', async () => {
    const permits = server.createList('managerPermit', 5)
    server.schema.first('userType')?.userPermit.update({
        managerPermitList: permits
    })

    const { findByTestId } = render(
        <SeasonProvider>
            <ManagerSeasonList />
        </SeasonProvider>,
        {
            wrapper: MockAppProvider
        }
    )

    const firstPermit = permits[0]
    const firstOrgName = firstPermit.season.organization.name

    const selectedSelectable = await findByTestId(
        'selected-organization-selectable'
    )
    const orgNameText = within(selectedSelectable).getByText(firstOrgName)

    expect(orgNameText).not.toBeNull()
})

it('loads without error when no organizations are present', async () => {
    const { findByText } = render(
        <SeasonProvider>
            <>
                <Text>Loaded</Text>
                <ManagerSeasonList />
            </>
        </SeasonProvider>,
        {
            wrapper: MockAppProvider
        }
    )

    expect(await findByText('Loaded')).not.toThrow()
})
