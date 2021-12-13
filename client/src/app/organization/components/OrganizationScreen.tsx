import React from 'react'

import SubmittableCreateOrganizationForm from '../containers/SubmittableCreateOrganizationForm'
import OrganizationStack from '../utils/OrganizationStack'
import OwnedOrganizationScreen from './OwnedOrganizationScreen'

export default function OrganizationScreen() {
    return (
        <OrganizationStack.Navigator>
            <OrganizationStack.Screen
                name="OwnedOrganization"
                options={{ title: 'Your Organizations' }}
                component={OwnedOrganizationScreen}
            />
            <OrganizationStack.Screen
                name="CreateOrganization"
                options={{ title: 'Create Organization' }}
                component={SubmittableCreateOrganizationForm}
            />
        </OrganizationStack.Navigator>
    )
}
