import React from 'react'

import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

import { GetUserId } from '@/app/common/graphql/queries/__generated__/GetUserId'
import { GET_USER_ID } from '@/app/common/graphql/queries/getUserId'

import CreateOrganizationForm from '../components/CreateOrganizationForm'
import useCreateOrganization from '../graphql/mutations/createOrganization'
import { CreateOrganizationFormInput } from '../models/CreateOrganization'
import { OrganizationStackNavigation } from '../utils/OrganizationStack'

export default function SubmittableCreateOrganizationForm() {
    const navigation = useNavigation<OrganizationStackNavigation>()
    const [createOrganization] = useCreateOrganization()

    const { data: dataMe } = useQuery<GetUserId>(GET_USER_ID)

    const handleFormSubmit = async (input: CreateOrganizationFormInput) => {
        const ownerId = dataMe?.me?.id
        if (!ownerId) return

        await createOrganization({
            variables: {
                input: {
                    owner: ownerId,
                    ...input
                }
            }
        })

        navigation.navigate({ name: 'OwnedOrganization', params: undefined })
    }

    return <CreateOrganizationForm onSubmit={handleFormSubmit} />
}
