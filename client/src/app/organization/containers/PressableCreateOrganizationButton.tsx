import React from 'react'

import { useNavigation } from '@react-navigation/native'

import CreateOrganizationButton from '../components/CreateOrganizationButton'
import { OrganizationStackNavigation } from '../utils/OrganizationStack'

export default function PressableCreateOrganizationButton() {
    const navigation = useNavigation<OrganizationStackNavigation>()

    return (
        <CreateOrganizationButton
            onPress={() =>
                navigation.navigate({
                    name: 'CreateOrganization',
                    params: undefined
                })
            }
        />
    )
}
