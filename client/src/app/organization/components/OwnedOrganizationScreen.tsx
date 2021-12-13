import React from 'react'

import { VStack } from 'native-base'

import PressableCreateOrganizationButton from '../containers/PressableCreateOrganizationButton'
import SelectableOwnedOrganizationList from '../containers/SelectableOwnedOrganizationList'

export default function OwnedOrganizationScreen() {
    return (
        <VStack space={4} m={4}>
            <SelectableOwnedOrganizationList />
            <PressableCreateOrganizationButton />
        </VStack>
    )
}
